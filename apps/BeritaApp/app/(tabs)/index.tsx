import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CategoryFilter } from "@/src/components/CategoryFilter";
import { ErrorView } from "@/src/components/ErrorView";
import { NewsCard } from "@/src/components/NewsCard";
import { useBookmarks } from "@/src/hooks/useBookmarks";
import { useNews } from "@/src/hooks/useNews";
import { useNewsSearch } from "@/src/hooks/useSearch";
import { Category } from "@/src/services/newsService";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
};

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "Umum", value: "general" },
  { label: "Teknologi", value: "technology" },
  { label: "Olahraga", value: "sports" },
  { label: "Bisnis", value: "business" },
  { label: "Kesehatan", value: "health" },
];

export default function HomeScreen() {
  const queryClient = useQueryClient();

  // state
  const [category, setCategory] = useState<Category>("general");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { bookmarks, toggleBookmark } = useBookmarks();

  // news default
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNews(category);

  // search + filter
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useNewsSearch(search, source, fromDate, toDate);

  // logic filtering
  const isFiltering =
    search.length >= 3 || source.length >= 3 || !!fromDate || !!toDate;

  const articles: Article[] = isFiltering
    ? (searchData?.articles ?? [])
    : (data?.pages.flatMap((p: any) => p.articles) ?? []);

  const renderItem = ({ item }: { item: Article }) => (
    <NewsCard
      article={item}
      onPress={() => {}}
      onBookmark={() => toggleBookmark(item)}
      isBookmarked={bookmarks.some((b) => b.url === item.url)}
    />
  );

  // Loading default
  if (isLoading && !isFiltering)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Memuat berita...</Text>
      </SafeAreaView>
    );

  // loading search
  if (isSearchLoading && isFiltering)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Mencari berita...</Text>
      </SafeAreaView>
    );

  // ERROR HANDLER FINAL (ANTI STUCK)
  if (isError || isSearchError)
    return (
      <ErrorView
        message={(searchError || error)?.message}
        onRetry={() => {
          // RESET STATE
          setSearch("");
          setSource("");
          setFromDate("");
          setToDate("");

          // CLEAR CACHE
          queryClient.removeQueries({ queryKey: ["search"] });

          // FETCH NORMAL DATA
          refetch();
        }}
      />
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>BeritaApp</Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Cari berita..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* FILTER */}
      <TextInput
        placeholder="Sumber (contoh: bbc-news)"
        value={source}
        onChangeText={setSource}
        style={styles.search}
      />

      <TextInput
        placeholder="Dari tanggal (YYYY-MM-DD)"
        value={fromDate}
        onChangeText={setFromDate}
        style={styles.search}
      />

      <TextInput
        placeholder="Sampai tanggal (YYYY-MM-DD)"
        value={toDate}
        onChangeText={setToDate}
        style={styles.search}
      />

      {/* RESET BUTTON */}
      <Text
        onPress={() => {
          setSearch("");
          setSource("");
          setFromDate("");
          setToDate("");

          queryClient.removeQueries({ queryKey: ["search"] });
        }}
        style={{
          textAlign: "center",
          color: "blue",
          marginBottom: 10,
        }}
      >
        Reset Filter
      </Text>

      {/* CATEGORY */}
      <CategoryFilter
        categories={CATEGORIES}
        selected={category}
        onChange={setCategory}
      />

      {/* LIST */}
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 12,
  },
  loadingText: {
    marginTop: 10,
    textAlign: "center",
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 6,
    padding: 8,
  },
});

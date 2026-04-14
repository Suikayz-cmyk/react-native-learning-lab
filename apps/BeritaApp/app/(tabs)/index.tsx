import { darkTheme, lightTheme } from "@/src/constants/theme";
import { useTheme } from "@/src/context/ThemeContext";
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

  // theme
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  // data
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

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useNewsSearch(search, source, fromDate, toDate);

  // filtering logic (SAFE)
  const isFiltering =
    search.trim().length >= 3 ||
    (source?.trim().length ?? 0) >= 3 ||
    !!fromDate ||
    !!toDate;

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

  // loading default
  if (isLoading && !isFiltering)
    return (
      <SafeAreaView
        style={[styles.center, { backgroundColor: colors.background }]}
      >
        <ActivityIndicator />
        <Text style={{ color: colors.text }}>Memuat berita...</Text>
      </SafeAreaView>
    );

  // loading search
  if (isSearchLoading && isFiltering)
    return (
      <SafeAreaView
        style={[styles.center, { backgroundColor: colors.background }]}
      >
        <ActivityIndicator />
        <Text style={{ color: colors.text }}>Mencari berita...</Text>
      </SafeAreaView>
    );

  // error handler
  if (isError || isSearchError)
    return (
      <ErrorView
        message={(searchError || error)?.message}
        onRetry={() => {
          setSearch("");
          setSource("");
          setFromDate("");
          setToDate("");

          queryClient.removeQueries({ queryKey: ["search"] });

          refetch();
        }}
      />
    );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.header, { color: colors.text }]}>BeritaApp</Text>

      <Text
        onPress={toggleTheme}
        style={{
          textAlign: "center",
          color: "#3b82f6",
          marginBottom: 10,
        }}
      >
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Cari berita..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
        style={[styles.search, { color: colors.text, borderColor: "#888" }]}
      />

      {/* FILTER */}
      <TextInput
        placeholder="Sumber (contoh: bbc-news)"
        placeholderTextColor="#888"
        value={source}
        onChangeText={setSource}
        style={[styles.search, { color: colors.text, borderColor: "#888" }]}
      />

      <TextInput
        placeholder="Dari tanggal (YYYY-MM-DD)"
        placeholderTextColor="#888"
        value={fromDate}
        onChangeText={setFromDate}
        style={[styles.search, { color: colors.text, borderColor: "#888" }]}
      />

      <TextInput
        placeholder="Sampai tanggal (YYYY-MM-DD)"
        placeholderTextColor="#888"
        value={toDate}
        onChangeText={setToDate}
        style={[styles.search, { color: colors.text, borderColor: "#888" }]}
      />

      {/* RESET */}
      <Text
        onPress={() => {
          setSearch("");
          setSource("");
          setFromDate("");
          setToDate("");
          queryClient.removeQueries({ queryKey: ["search"] });
        }}
        style={{ textAlign: "center", color: "#3b82f6", marginBottom: 10 }}
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
  search: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 6,
    padding: 8,
  },
});

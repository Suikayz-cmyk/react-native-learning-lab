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
  const [category, setCategory] = useState<Category>("general");
  const [search, setSearch] = useState("");

  const { bookmarks, toggleBookmark } = useBookmarks();

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

  const { data: searchData, isLoading: isSearchLoading } =
    useNewsSearch(search);

  // 🔥 SATU AJA, JANGAN DOUBLE
  const articles: Article[] =
    search.length >= 3
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

  if (isLoading)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Memuat berita...</Text>
      </SafeAreaView>
    );

  if (isError) return <ErrorView message={error.message} onRetry={refetch} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>BeritaApp</Text>

      <TextInput
        placeholder="Cari berita..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <CategoryFilter
        categories={CATEGORIES}
        selected={category}
        onChange={setCategory}
      />

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
  error: {
    color: "red",
    fontSize: 16,
    margin: 10,
  },
  retry: {
    color: "blue",
    margin: 10,
  },
  loadingText: {
    marginTop: 10,
    textAlign: "center",
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    margin: 10,
    padding: 8,
  },
});

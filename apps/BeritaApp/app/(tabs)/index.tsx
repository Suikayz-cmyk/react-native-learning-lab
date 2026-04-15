import { darkTheme, lightTheme } from "@/src/constants/theme";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CategoryFilter } from "@/src/components/CategoryFilter";
import { NewsCard } from "@/src/components/NewsCard";
import { useBookmarks } from "@/src/hooks/useBookmarks";
import { useNewsSearch } from "@/src/hooks/useSearch";
import { Category } from "@/src/services/newsService";

import { ErrorView } from "@/src/components/ErrorView";
import { useNews } from "@/src/hooks/useNews";
import { ActivityIndicator, RefreshControl } from "react-native";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
};

// MOCK DATA (for testing UI without API)
const MOCK_ARTICLES = [
  {
    title: "Contoh Berita Teknologi",
    description: "Ini adalah berita dummy untuk testing UI.",
    url: "https://example.com",
    urlToImage: "https://picsum.photos/400/200",
    publishedAt: new Date().toISOString(),
    source: { name: "Mock News" },
  },
  {
    title: "Berita Kedua",
    description: "UI tetap bisa dikembangkan tanpa API.",
    url: "https://example.com/2",
    urlToImage: "https://picsum.photos/400/201",
    publishedAt: new Date().toISOString(),
    source: { name: "Dummy Source" },
  },
];

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "Umum", value: "general" },
  { label: "Teknologi", value: "technology" },
  { label: "Olahraga", value: "sports" },
  { label: "Bisnis", value: "business" },
  { label: "Kesehatan", value: "health" },
];

export default function HomeScreen() {
  //const queryClient = useQueryClient();

  // state
  const [category, setCategory] = useState<Category>("general");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { bookmarks, toggleBookmark } = useBookmarks();
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedSource, setAppliedSource] = useState("");
  const [appliedFromDate, setAppliedFromDate] = useState("");
  const [appliedToDate, setAppliedToDate] = useState("");

  // theme
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const USE_MOCK = false;

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
  } = useNewsSearch(
    appliedSearch,
    appliedSource,
    appliedFromDate,
    appliedToDate,
  );

  // filtering logic
  const isFiltering =
    appliedSearch.trim().length >= 3 ||
    (appliedSource?.trim().length ?? 0) >= 3 ||
    !!appliedFromDate ||
    !!appliedToDate;

  const articles = USE_MOCK
    ? MOCK_ARTICLES
    : isFiltering
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

          refetch();
        }}
      />
    );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.header, { color: colors.text }]}>BeritaApp</Text>

        <View style={styles.headerActions}>
          {/* SEARCH ICON */}
          <TouchableOpacity onPress={() => setShowSearch((prev) => !prev)}>
            <Ionicons name="search" size={22} color={colors.text} />
          </TouchableOpacity>

          {/* THEME TOGGLE */}
          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons
              name={theme === "dark" ? "sunny" : "moon"}
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>

          {/* FILTER ICON */}
          <TouchableOpacity onPress={() => setShowFilter((prev) => !prev)}>
            <Ionicons name="options" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH */}
      {showSearch && (
        <TextInput
          placeholder="Cari berita..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
          style={[
            styles.search,
            {
              color: colors.text,
              borderColor: colors.border,
              backgroundColor: theme === "dark" ? "#1E1E1E" : "#F9F9F9",
            },
          ]}
        />
      )}

      {showFilter && (
        <View style={styles.filterContainer}>
          {/* SOURCE */}
          <TextInput
            placeholder="Sumber (bbc-news)"
            placeholderTextColor="#888"
            value={source}
            onChangeText={setSource}
            style={[
              styles.search,
              { color: colors.text, borderColor: colors.border },
            ]}
          />

          {/* DATE PICKER */}
          <View style={styles.filterContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Date:</Text>

            <View style={styles.dateRow}>
              {/* FROM */}
              <View style={styles.dateItem}>
                <Text style={{ color: colors.text }}>From</Text>
                <TouchableOpacity onPress={() => setShowFromPicker(true)}>
                  <Ionicons name="calendar" size={22} color={colors.text} />
                </TouchableOpacity>
                <Text style={{ color: colors.text, fontSize: 12 }}>
                  {fromDate || "-"}
                </Text>
              </View>

              {/* TO */}
              <View style={styles.dateItem}>
                <Text style={{ color: colors.text }}>To</Text>
                <TouchableOpacity onPress={() => setShowToPicker(true)}>
                  <Ionicons name="calendar" size={22} color={colors.text} />
                </TouchableOpacity>
                <Text style={{ color: colors.text, fontSize: 12 }}>
                  {toDate || "-"}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              setAppliedSearch(search);
              setAppliedSource(source);
              setAppliedFromDate(fromDate);
              setAppliedToDate(toDate);
            }}
            style={styles.applyBtn}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Apply Filter
            </Text>
          </TouchableOpacity>

          {/* RESET */}
          <TouchableOpacity
            onPress={() => {
              setSource("");
              setFromDate("");
              setToDate("");
            }}
            style={styles.resetBtn}
          >
            <Text style={styles.resetText}>Reset Filter</Text>
          </TouchableOpacity>
        </View>
      )}

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
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 24,
        }}
      />

      {showFromPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          onChange={(event, date) => {
            setShowFromPicker(false);
            if (date) setFromDate(date.toISOString().split("T")[0]);
          }}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          onChange={(event, date) => {
            setShowToPicker(false);
            if (date) setToDate(date.toISOString().split("T")[0]);
          }}
        />
      )}
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
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  search: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },

  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  filterContainer: {
    marginHorizontal: 12,
    marginBottom: 10,
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 40,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  dateItem: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },

  resetBtn: {
    marginTop: 12,
    backgroundColor: "#ef4444", // merah
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  resetText: {
    color: "#fff",
    fontWeight: "600",
  },
  applyBtn: {
    marginTop: 10,
    backgroundColor: "#3b82f6",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
});

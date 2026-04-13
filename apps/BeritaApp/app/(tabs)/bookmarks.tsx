import { NewsCard } from "@/src/components/NewsCard";
import { useBookmarks } from "@/src/hooks/useBookmarks";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookmarkScreen() {
  const { bookmarks, toggleBookmark, loadBookmarks } = useBookmarks();

  useFocusEffect(
    useCallback(() => {
      // reload saat screen dibuka
      loadBookmarks();
    }, []),
  );

  const renderItem = ({ item }: any) => (
    <NewsCard
      article={item}
      onPress={() => {}}
      onBookmark={() => toggleBookmark(item)}
      isBookmarked={true}
    />
  );

  if (bookmarks.length === 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Belum ada bookmark</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
      />
    </SafeAreaView>
  );
}

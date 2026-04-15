import { NewsCard } from "@/src/components/NewsCard";
import { darkTheme, lightTheme } from "@/src/constants/theme";
import { useTheme } from "@/src/context/ThemeContext";
import { useBookmarks } from "@/src/hooks/useBookmarks";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookmarkScreen() {
  const { bookmarks, toggleBookmark, loadBookmarks } = useBookmarks();

  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  useFocusEffect(
    useCallback(() => {
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
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text style={{ color: colors.text }}>Belum ada bookmark</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 8,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.text }}>
          List Bookmark
        </Text>

        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={theme === "dark" ? "sunny" : "moon"}
            size={22}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 24,
        }}
      />
    </SafeAreaView>
  );
}

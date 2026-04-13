import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const STORAGE_KEY = "BOOKMARKS";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  // load dari storage
  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setBookmarks(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error load bookmarks", error);
    }
  };

  const saveBookmarks = async (newBookmarks: any[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
    } catch (error) {
      console.log("Error save bookmarks", error);
    }
  };

  const toggleBookmark = (article: any) => {
    const exists = bookmarks.find((b) => b.url === article.url);

    let updated;

    if (exists) {
      updated = bookmarks.filter((b) => b.url !== article.url);
    } else {
      updated = [...bookmarks, article];
    }

    setBookmarks(updated);
    saveBookmarks(updated);
  };

  return {
    bookmarks,
    toggleBookmark,
    loadBookmarks,
  };
};

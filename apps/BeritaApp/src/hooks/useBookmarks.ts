import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const STORAGE_KEY = "BOOKMARKS";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
};

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (!data) {
        setBookmarks([]);
        return;
      }

      const parsed = JSON.parse(data);

      if (Array.isArray(parsed)) {
        setBookmarks(parsed);
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.log("Error load bookmarks:", error);
      setBookmarks([]);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveBookmarks = async (newBookmarks: Article[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
    } catch (error) {
      console.log("Error save bookmarks:", error);
    }
  };

  const toggleBookmark = (article: Article) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.url === article.url);

      let updated;

      if (exists) {
        updated = prev.filter((b) => b.url !== article.url);
      } else {
        updated = [...prev, article];
      }

      saveBookmarks(updated);

      return updated;
    });
  };

  return {
    bookmarks,
    toggleBookmark,
    loadBookmarks,
    isLoaded,
  };
};

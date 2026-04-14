import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
};

interface NewsCardProps {
  article: Article;
  onPress: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

// fallback image
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

// format tanggal
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const router = useRouter();

export function NewsCard({
  article,
  onPress,
  onBookmark,
  isBookmarked,
}: NewsCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/news/${encodeURIComponent(article.url)}`)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: article.urlToImage ?? PLACEHOLDER_IMAGE }}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.content}>
        <View style={styles.sourceBadge}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {article.description}
        </Text>
      </View>
      <TouchableOpacity style={styles.bookmarkBtn} onPress={onBookmark}>
        <Ionicons
          name={isBookmarked ? "bookmark" : "bookmark-outline"}
          size={20}
          color={isBookmarked ? "#0891B2" : "#94A3B8"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    padding: 10,
  },
  sourceBadge: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  source: {
    fontSize: 12,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  bookmarkBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

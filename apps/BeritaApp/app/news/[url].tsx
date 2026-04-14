import { useLocalSearchParams } from "expo-router";
import {
    Linking,
    SafeAreaView,
    Text,
    TouchableOpacity
} from "react-native";

export default function NewsDetailScreen() {
  const { url } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Detail Berita
      </Text>

      <Text numberOfLines={3} style={{ marginBottom: 20 }}>
        {url}
      </Text>

      <TouchableOpacity
        onPress={() => Linking.openURL(url as string)}
        style={{
          backgroundColor: "#0891B2",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Buka di Browser
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

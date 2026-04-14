import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function NewsDetailScreen() {
  const { url } = useLocalSearchParams();

  if (!url) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: url as string }}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" />}
      />
    </SafeAreaView>
  );
}

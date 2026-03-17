import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen({ setIsLoggedIn }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>

      {/* Header Profile */}
      <View
        style={{
          alignItems: "center",
          padding: 20,
          backgroundColor: "white",
        }}
      >
        <Image
          source={require("../../../assets/profile/avatar.jpg")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
            borderWidth: 3,
            borderColor: "white"
          }}
        />

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Muhammad Prayogo Pangestu
        </Text>

        <Text style={{ color: "gray" }}>
          2410501046@mahasiswa.upnvj.ac.id
        </Text>
      </View>

      {/* Menu */}
      <View style={{ marginTop: 20 }}>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 15,
            borderBottomWidth: 1,
            borderColor: "#eee",
          }}
        >
          <Text>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 15,
            borderBottomWidth: 1,
            borderColor: "#eee",
          }}
        >
          <Text>Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 15,
          }}
        >
          <Text>Settings</Text>
        </TouchableOpacity>

      </View>

      {/* Logout */}
      <TouchableOpacity
        style={{
          marginTop: 30,
          backgroundColor: "white",
          padding: 15,
          alignItems: "center",
        }}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text style={{ color: "red", fontWeight: "bold" }}>
          Logout
        </Text>
      </TouchableOpacity>

    </View>
    </SafeAreaView>
  );
}
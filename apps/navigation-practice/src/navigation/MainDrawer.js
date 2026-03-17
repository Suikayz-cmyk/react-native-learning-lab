import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeTabs from "./HomeTabs";

const Drawer = createDrawerNavigator();

export default function MainDrawer({ setIsLoggedIn }) {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}

      drawerContent={(props) => (
        <SafeAreaView style={{ flex: 1 }}>

          <View style={{ flex: 1, justifyContent: "space-between" }}>

            {/* MENU */}
            <View>

              {/* HEADER DRAWER */}
              <View
                style={{
                  padding: 20,
                  borderBottomWidth: 1,
                  borderColor: "#eee"
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Navigation
                </Text>
              </View>

              {/* HOME */}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 15
                }}
                onPress={() =>
                  props.navigation.navigate("Home", {
                    screen: "Home"
                  })
                }
              >
                <Ionicons name="home" size={20} style={{ marginRight: 10 }} />
                <Text>Home</Text>
              </TouchableOpacity>

              {/* CART */}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 15
                }}
                onPress={() =>
                  props.navigation.navigate("Home", {
                    screen: "Cart"
                  })
                }
              >
                <Ionicons name="cart" size={20} style={{ marginRight: 10 }} />
                <Text>Cart</Text>
              </TouchableOpacity>

              {/* PROFILE */}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 15
                }}
                onPress={() =>
                  props.navigation.navigate("Home", {
                    screen: "Profile"
                  })
                }
              >
                <Ionicons name="person" size={20} style={{ marginRight: 10 }} />
                <Text>Profile</Text>
              </TouchableOpacity>

            </View>

            {/* LOGOUT */}
            <TouchableOpacity
              style={{
                padding: 20,
                borderTopWidth: 1,
                borderColor: "#ddd",
                flexDirection: "row",
                alignItems: "center"
              }}
              onPress={() => setIsLoggedIn(false)}
            >
              <Ionicons
                name="log-out"
                size={20}
                color="red"
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Logout
              </Text>
            </TouchableOpacity>

          </View>

        </SafeAreaView>
      )}
    >
      <Drawer.Screen name="Home">
        {(props) => (
          <HomeTabs {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Drawer.Screen>

    </Drawer.Navigator>
  );
}
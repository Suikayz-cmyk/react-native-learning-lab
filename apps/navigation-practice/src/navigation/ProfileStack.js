import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function ProfileStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Profile"
        options={({ navigation }) => ({
          title: "Profile",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="menu" size={24} />
            </TouchableOpacity>
          )
        })}
      >
        {(props) => (
          <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
}
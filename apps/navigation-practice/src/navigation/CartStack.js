import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/cart/CartScreen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          title: "Cart",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="menu" size={24} />
            </TouchableOpacity>
          )
        })}
      />

    </Stack.Navigator>
  );
}
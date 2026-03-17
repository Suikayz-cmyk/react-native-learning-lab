import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import ProductDetailScreen from '../screens/home/ProductDetailScreen';

import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
   <Stack.Navigator>
  <Stack.Screen 
   name="HomeMain"
  component={HomeScreen}
  options={({ navigation }) => ({
    title: "Home",
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
  <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
</Stack.Navigator>
  );
}
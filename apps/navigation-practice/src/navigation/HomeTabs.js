import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

import HomeStack from './HomeStack';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CartStack from "./CartStack";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

export default function HomeTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          

          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } 
          else if (route.name === "Cart") {
            iconName = "cart";
          } 
          else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >

      <Tab.Screen name="Home" component={HomeStack} />

      <Tab.Screen name="Cart" component={CartStack} />

      <Tab.Screen name="Profile">
        {(props) => (
          <ProfileStack {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
}
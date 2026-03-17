import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator({ setIsLoggedIn }) {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

    </Stack.Navigator>
  );
}
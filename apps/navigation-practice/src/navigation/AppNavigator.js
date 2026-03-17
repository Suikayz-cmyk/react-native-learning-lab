import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainDrawer from './MainDrawer';
import AuthNavigator from './AuthNavigator';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export function AppNavigator() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {isLoggedIn ? (
        <Stack.Screen name="Main">
          {(props) => (
            <MainDrawer {...props} setIsLoggedIn={setIsLoggedIn} />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Auth">
          {(props) => (
            <AuthNavigator {...props} setIsLoggedIn={setIsLoggedIn} />
          )}
        </Stack.Screen>
      )}

    </Stack.Navigator>
  );
}
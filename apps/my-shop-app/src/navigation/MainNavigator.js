import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// sementara screen dummy 
import { View, Text } from 'react-native'

const Tab = createBottomTabNavigator()

const ProductScreen = () => (
  <View>
    <Text>Product Screen</Text>
  </View>
)

const CartScreen = () => (
  <View>
    <Text>Cart Screen</Text>
  </View>
)

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={ProductScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  )
}
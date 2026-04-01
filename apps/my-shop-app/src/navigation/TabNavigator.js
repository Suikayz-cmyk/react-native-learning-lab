import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ProductListScreen from '../screens/ProductListScreen'
import CartScreen from '../screens/CartScreen'

const Tab = createBottomTabNavigator()
export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  )
}
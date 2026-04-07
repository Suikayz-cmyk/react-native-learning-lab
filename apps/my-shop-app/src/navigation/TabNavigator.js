import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

import ProductListScreen from '../screens/ProductListScreen'
import CartScreen from '../screens/CartScreen'

const Tab = createBottomTabNavigator()

export default function MainNavigator() {
  const items = useSelector(state => state.cart.items)

  // total semua quantity
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName

          if (route.name === 'Products') {
            iconName = 'list'
          } else if (route.name === 'Cart') {
            iconName = 'cart'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Products" component={ProductListScreen} />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: totalQty > 0 ? totalQty : null,
        }}
      />
    </Tab.Navigator>
  )
}
import React from 'react'
import { Provider } from 'react-redux'

import { store } from './src/store'
import MainNavigator from './src/navigation/TabNavigator'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  )
}
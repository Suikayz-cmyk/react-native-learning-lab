import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/store'

// screen sementara 
import { View, Text } from 'react-native'

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Text>Redux Connected</Text>
      </View>
    </Provider>
  )
}
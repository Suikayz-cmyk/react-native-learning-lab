import React from 'react'
import { View, Text, Button } from 'react-native'

export default function ProductCard({ item, onAdd }) {
  return (
    <View style={{ padding: 12, marginBottom: 10 }}>
      <Text>{item.name}</Text>
      <Text>Rp {item.price}</Text>

      <Button title="Add to Cart" onPress={onAdd} />
    </View>
  )
}
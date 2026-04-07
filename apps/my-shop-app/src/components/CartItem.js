import React from 'react'
import { View, Text, Button } from 'react-native'

export default function CartItem({ item, onRemove }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text>{item.name}</Text>
      <Text>Rp {item.price} x {item.quantity}</Text>
      <Text>Subtotal: Rp {item.price * item.quantity}</Text>

      <Button title="Hapus" onPress={onRemove} />
    </View>
  )
}
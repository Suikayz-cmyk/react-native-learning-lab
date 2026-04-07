import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function CartItem({ item, onPlus, onMinus, onRemove }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text>{item.name}</Text>
      <Text>Rp {item.price}</Text>

      {/* Quantity Control */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <TouchableOpacity onPress={onMinus}>
          <Text style={{ fontSize: 20 }}>➖</Text>
        </TouchableOpacity>

        <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>

        <TouchableOpacity onPress={onPlus}>
          <Text style={{ fontSize: 20 }}>➕</Text>
        </TouchableOpacity>
      </View>

      <Text>Subtotal: Rp {item.price * item.quantity}</Text>

      <TouchableOpacity onPress={onRemove}>
        <Text style={{ color: 'red' }}>Hapus</Text>
      </TouchableOpacity>
    </View>
  )
}
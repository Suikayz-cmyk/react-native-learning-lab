import React from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, clearCart } from '../store/cartSlice'

export default function CartScreen() {
  const dispatch = useDispatch()

  // WHY: ambil data dari Redux store
  const items = useSelector(state => state.cart.items)
  const total = useSelector(state => state.cart.total)

  return (
    <View style={{ padding: 12 }}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.name}</Text>
            <Text>Rp {item.price}</Text>

            <Button
              title="Hapus"
              onPress={() => dispatch(removeItem(item.id))}
            />
          </View>
        )}
      />

      <Text>Total: Rp {total}</Text>

      <Button
        title="Clear Cart"
        onPress={() => dispatch(clearCart())}
      />
    </View>
  )
}
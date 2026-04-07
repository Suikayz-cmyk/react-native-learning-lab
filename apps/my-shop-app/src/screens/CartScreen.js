import React from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { incrementItem, decrementItem, removeItem, clearCart } from '../store/cartSlice'
import CartItem from '../components/CartItem'

export default function CartScreen() {
  const dispatch = useDispatch()

  const items = useSelector(state => state.cart.items)
  const total = useSelector(state => state.cart.total)

  return (
    <View style={{ padding: 12 }}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onPlus={() => dispatch(incrementItem(item.id))}
            onMinus={() => dispatch(decrementItem(item.id))}
            onRemove={() => dispatch(removeItem(item.id))}
          />
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
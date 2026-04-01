import React from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'
import { products } from '../data/products'

export default function ProductListScreen() {
  const dispatch = useDispatch()

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Text>{item.name}</Text>
          <Text>Rp {item.price}</Text>

          <Button
            title="Add to Cart"
            onPress={() => dispatch(addItem(item))}
          />
        </View>
      )}
    />
  )
}
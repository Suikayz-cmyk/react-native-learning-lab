import React from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ProductListScreen() {
  const dispatch = useDispatch()

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          onAdd={() => dispatch(addItem(item))}
        />
      )}
    />
  )
}
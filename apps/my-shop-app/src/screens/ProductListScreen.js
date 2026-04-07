import React from 'react'
import { FlatList, Alert } from 'react-native'
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
          onAdd={(qty) => {
            for (let i = 0; i < qty; i++) {
              dispatch(addItem(item))
            }

            Alert.alert('Berhasil', `${item.name} x${qty} ditambahkan`)
          }}
        />
      )}
    />
  )
}
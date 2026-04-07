import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { formatRupiah } from '../utils/formatRupiah'

export default function ProductCard({ item, onAdd }) {
  const [qty, setQty] = useState(1)

  return (
    <View style={styles.card}>
      
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Rp. {formatRupiah(item.price)}</Text>

      {/* QUANTITY */}
      <View style={styles.qtyContainer}>
        <TouchableOpacity onPress={() => setQty(q => Math.max(1, q - 1))}>
            <Ionicons name="remove" size={20} />
        </TouchableOpacity>

        <Text style={styles.qty}>{qty}</Text>

        <TouchableOpacity onPress={() => setQty(q => q + 1)}>
            <Ionicons name="add" size={20} />
        </TouchableOpacity>
        </View>

      {/* ADD BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => onAdd(qty)}
      >
        <Text style={{ color: '#fff' }}>Add to Cart</Text>
      </TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },

  category: {
    fontSize: 12,
    color: 'gray',
  },

  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  stock: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 8,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    marginLeft: 6,
  },
  
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 10,
  },

  qty: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
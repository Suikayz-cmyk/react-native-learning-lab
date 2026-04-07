import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function ProductCard({ item, onAdd }) {
  return (
    <View style={styles.card}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>

      {/* PRICE */}
      <Text style={styles.price}>Rp {item.price}</Text>

      {/* STOCK */}
      <Text style={styles.stock}>Stock: {item.stock}</Text>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Ionicons name="add-circle-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Add</Text>
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
})
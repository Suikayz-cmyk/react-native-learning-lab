import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function CartItem({ item, onPlus, onMinus, onRemove }) {
  return (
   <View style={styles.card}>
  
    {/* HEADER */}
    <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>

        <TouchableOpacity onPress={onRemove}>
        <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
    </View>

    <Text style={styles.price}>Rp {item.price}</Text>

    {/* QUANTITY */}
    <View style={styles.row}>
        <TouchableOpacity onPress={onMinus}>
        <Ionicons name="remove-circle-outline" size={24} />
        </TouchableOpacity>

        <Text style={styles.qty}>{item.quantity}</Text>

        <TouchableOpacity onPress={onPlus}>
        <Ionicons name="add-circle-outline" size={24} />
        </TouchableOpacity>
    </View>

    <Text style={styles.subtotal}>
        Subtotal: Rp {item.price * item.quantity}
    </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  qty: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  subtotal: {
    fontWeight: 'bold',
  },
})
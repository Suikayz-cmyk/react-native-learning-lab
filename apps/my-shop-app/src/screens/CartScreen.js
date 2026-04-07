import React from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { incrementItem, decrementItem, removeItem, clearCart } from '../store/cartSlice'
import CartItem from '../components/CartItem'
import { TouchableOpacity } from 'react-native'


export default function CartScreen() {
  const dispatch = useDispatch()
 
  const items = useSelector(state => state.cart.items)
  const total = useSelector(state => state.cart.total)

  return (
    <View style={styles.container}>
      
      {/* LIST */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onPlus={() => dispatch(incrementItem(item.id))}
            onMinus={() => dispatch(decrementItem(item.id))}
            onRemove={() => dispatch(removeItem(item.id))}
          />
        )}
      />

      {/* STICKY FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: Rp {total}</Text>

        <TouchableOpacity style={styles.clearBtn} onPress={() => dispatch(clearCart())}>
          <Text style={{ color: '#fff' }}>Clear Cart</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: 16,
      borderTopWidth: 1,
      borderColor: '#ddd',
    },

    total: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 8,
    },

    clearBtn: {
      backgroundColor: 'red',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
  })
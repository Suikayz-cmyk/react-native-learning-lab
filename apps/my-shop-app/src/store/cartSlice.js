import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',

  // state awal cart
  initialState: {
    items: [],
    total: 0,
  },

  reducers: {
    // tambah produk ke cart
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }

      state.total += action.payload.price
    },

    // hapus item by id
    removeItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)

      if (!item) return

      state.total -= item.price * item.quantity
      state.items = state.items.filter(i => i.id !== action.payload)
    },

    incrementItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)

      if (item) {
        item.quantity += 1
        state.total += item.price
      }
    },

    decrementItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)

      if (!item) return

      if (item.quantity > 1) {
        item.quantity -= 1
        state.total -= item.price
      } else {
        state.items = state.items.filter(i => i.id !== action.payload)
        state.total -= item.price
      }
    },

    // reset isi cart
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
})

// export action
export const {
  addItem,
  removeItem,
  clearCart,
  incrementItem,
  decrementItem
} = cartSlice.actions

// export reducer
export default cartSlice.reducer
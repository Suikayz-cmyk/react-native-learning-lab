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
      state.items.push(action.payload)
      state.total += action.payload.price
    },

    // hapus item by id
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    // reset isi cart
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
})

// export action biar bisa dipanggil dari UI
export const { addItem, removeItem, clearCart } = cartSlice.actions

// export reducer untuk dimasukin ke store
export default cartSlice.reducer
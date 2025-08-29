import { createSlice } from '@reduxjs/toolkit'

const calculateTotals = (items) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  return { totalQuantity, total }
}

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  total: 0,
}

// Calculate initial totals
const savedItems = JSON.parse(localStorage.getItem('cartItems')) || []
const { total } = calculateTotals(savedItems)
initialState.total = total

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity: newItem.quantity
        })
      }
      
      const { total } = calculateTotals(state.items)
      state.total = total
      
      localStorage.setItem('cartItems', JSON.stringify(state.items))
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(item => item.id !== id)
      
      const { total } = calculateTotals(state.items)
      state.total = total
      
      localStorage.setItem('cartItems', JSON.stringify(state.items))
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem) {
        existingItem.quantity = quantity
      }
      
      const { total } = calculateTotals(state.items)
      state.total = total
      
      localStorage.setItem('cartItems', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      localStorage.removeItem('cartItems')
    },
    loadCartFromStorage: (state) => {
      const savedCart = JSON.parse(localStorage.getItem('cartItems')) || []
      state.items = savedCart
      const { total } = calculateTotals(savedCart)
      state.total = total
    }
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCartFromStorage } = cartSlice.actions
export default cartSlice.reducer
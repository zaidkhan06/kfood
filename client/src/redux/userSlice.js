import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
   name: "user",
   initialState: {
      userData: null,
      city: null,
      currentState: null,
      currentAddress: null,
      shopInMyCity: null,
      itemsInMyCity: null,
      cartItems: [],
      totalAmount: 0
   },
   reducers: {
      setUserData: (state, action) => {
         state.userData = action.payload

      },
      setCurrentCity: (state, action) => {
         state.currentCity = action.payload
      },
      setCurrentState: (state, action) => {
         state.currentState = action.payload
      },
      setCurrentAddress: (state, action) => {
         state.currentAddress = action.payload
      },
      setShopInMyCity: (state, action) => {
         state.shopInMyCity = action.payload
      },
      setItemsInMyCity: (state, action) => {
         state.itemsInMyCity = action.payload
      },
      addToCart: (state, action) => {
         const cartItems = action.payload
         const existingItem = state.cartItems.find(i => i.id == cartItems.id)
         if (existingItem) {
            existingItem.quantity += cartItems.quantity

         } else {
            state.cartItems.push(cartItems)
         }
         state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },

      updateQuantity: (state, action) => {
         const { id, quantity } = action.payload
         const item = state.cartItems.find(i => i.id == id)
         if (item) {
            item.quantity = quantity

         }
         state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)


      },
      removeCartItem: (state, action) => {
         state.cartItems = state.cartItems.filter(i => i.id !== action.payload)
         state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      }

   }
})

export const { setUserData, setCurrentCity, setCurrentAddress, setCurrentState, setShopInMyCity, setItemsInMyCity, addToCart, updateQuantity, removeCartItem } = userSlice.actions
export default userSlice.reducer
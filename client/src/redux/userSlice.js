import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        userData:null,
        city: null,
        currentState:null,
        currentAddress:null
    },
    reducers:{
        setUserData:(state, action)=>{
            state.userData=action.payload

        },
        setCurrentCity:(state, action)=>{
           state.currentCity=action.payload
        },
        setCurrentState:(state, action)=>{
           state.currentState=action.payload
        },
        setCurrentAddress:(state, action)=>{
           state.currentAddress=action.payload
        }
    }
})

export const {setUserData, setCurrentCity, setCurrentAddress, setCurrentState} = userSlice.actions
export default userSlice.reducer
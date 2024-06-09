import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./productSlice";


const sauceSlice = createSlice({
    name:"topping",

    initialState:{
        data:[],
        vegToppings:[],
        nonVegToppings:[],
        status:STATUSES.IDLE
    },

    reducers:{

    },
// extrareducers help the function to fetch products and show them accordingly on the UI
    extraReducers:(builder)=>{
        builder

        .addCase(searchToppings.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(searchToppings.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(searchToppings.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
        //searchVegSauces
        .addCase(searchVegToppings.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(searchVegToppings.fulfilled,(state,action)=>{
            state.vegToppings=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(searchVegToppings.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })

        //searchNonVegSauces
        .addCase(searchNonVegToppings.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(searchNonVegToppings.fulfilled,(state,action)=>{
            state.nonVegToppings=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(searchNonVegToppings.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })

    }

   

})

export const {extraReducers} = sauceSlice.actions; // extraReducers are actions here

export default sauceSlice.reducer;


//function to fetch crusts only
export const searchToppings = createAsyncThunk("toppings/fetch",async () => {

        const response = await fetch(`http://localhost:8080/api/product/getProducts?productType=3`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json"
            }
        })
        const data = await response.json();
        return data;
   
})
//function to fetch crusts only
export const searchVegToppings = createAsyncThunk("Vegtoppings/fetch",async () => {

        const response = await fetch(`http://localhost:8080/api/product/getProducts?productType=3&category=Veg`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json"
            }
        })
        const data = await response.json();
        return data;
   
})
//function to fetch crusts only
export const searchNonVegToppings = createAsyncThunk("NonVegtoppings/fetch",async () => {

    const response = await fetch(`http://localhost:8080/api/product/getProducts?productType=3&category=Non-veg`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json"
            }
        })
        const data = await response.json();
        return data;
   
})

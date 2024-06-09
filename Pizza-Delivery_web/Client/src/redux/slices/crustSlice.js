import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./productSlice";


const crustSlice = createSlice({
    name:"crust",

    initialState:{
        data:[],
        vegCrusts:[],
        nonVegCrusts:[],
        status:STATUSES.IDLE
    },

    reducers:{

    },
// extrareducers help the function to fetch products and show them accordingly on the UI
    extraReducers:(builder)=>{
        builder

        .addCase(searchCrusts.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(searchCrusts.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(searchCrusts.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
        //veg crusts
        .addCase(searchVegCrusts.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(searchVegCrusts.fulfilled,(state,action)=>{
            state.vegCrusts=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(searchVegCrusts.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
        //non veg crusts
        .addCase(searchNonVegCrusts.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(searchNonVegCrusts.fulfilled,(state,action)=>{
            state.nonVegCrusts=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(searchNonVegCrusts.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })

    }

   

})

export const {extraReducers} = crustSlice.actions; // extraReducers are actions here

export default crustSlice.reducer;


//function to fetch crusts only
export const searchCrusts = createAsyncThunk("crusts/fetch",async () => {

        const response = await fetch(`http://localhost:8080/api/product/getProducts?productType=1`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json"
            }
        })
        const data = await response.json();
        return data;
   
})
//function to fetch crusts only
export const searchVegCrusts = createAsyncThunk("Vegcrusts/fetch",async () => {

        const response = await fetch(`http://localhost:8080/api/product/getProducts?productType=1&category=Veg`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json"
            }
        })
        const data = await response.json();
        return data;
   
})
//function to fetch crusts only
export const searchNonVegCrusts = createAsyncThunk("NonVegcrusts/fetch",async () => {

        const response = await fetch(`http://localhost:8080/api/product/getProducts?productType=1&category=Non-veg`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json"
            }
        })
        const data = await response.json();
        return data;
   
})

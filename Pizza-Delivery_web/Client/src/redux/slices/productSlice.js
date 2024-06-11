import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading"
})

const productSlice = createSlice({
    name: "product",

    initialState: {
        data: [],
        productsBelow20: [],
        status: STATUSES.IDLE
    },

    reducers: {

    },
    // extrareducers help the function to fetch products and show them accordingly on the UI
    extraReducers: (builder) => {
        builder

            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload
                if (action.payload.length !== 0) {

                    state.productsBelow20 = action.payload.filter(x => x.quantity < 20);
                }
                state.status = STATUSES.IDLE

            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR
            })

    }



})

export const { extraReducers } = productSlice.actions; // extraReducers are actions here

export default productSlice.reducer;


//function to fetch products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    const response = await fetch("http://localhost:8080/api/product/view_products");
    const data = await response.json();
    return data;
})

import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../slices/orderSlice";
import cartReducer from "../slices/cartSlice";
import productReducer from "../slices/productSlice";
import userReducer from "../slices/userSlice";
import crustReducer from "../slices/crustSlice";
import sauceReducer from "../slices/sauceSlice";
import cheeseReducer from "../slices/cheeseSlice";
import toppingReducer from "../slices/toppingSlice";


export const store = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        crust:crustReducer,
        sauce:sauceReducer,
        cheese:cheeseReducer,
        topping:toppingReducer,
        cart:cartReducer,
        order:orderReducer
    }
})
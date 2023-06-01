import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import wishlistReducer from "./WishlistSlice";
import authReducer from "./AuthSlice";
import orderReducer from "./OrderSlice";


export default configureStore({
  reducer:{
    cart:cartReducer, 
    wishlist:wishlistReducer,
    auth:authReducer,
    order:orderReducer,
  }
}) 


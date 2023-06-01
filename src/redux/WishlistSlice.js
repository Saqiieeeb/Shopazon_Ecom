import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name:'wishlist',
  initialState:{
    wishlist:[]
  },
  reducers:{
    addToWishlist:(state,action)=>{
      const itemPresent = state.wishlist.find(
        (item) => item.id === action.payload.id
      );

      if (itemPresent) {
        if(state.wishlist.length===1) return;
        else{
          
          const founditem = state.wishlist.findIndex(el=>el==itemPresent);//finding index of presentitem
          state.wishlist.splice(founditem,1);//removing 1 item from founditemindex
          state.wishlist.unshift(itemPresent);//adding itemPresent at the first position
          // console.log("item already present moving to top of list")
          
          
        }
      } else {
        state.wishlist.push({ ...action.payload});
        // console.log("item added to wishlist");
      }
    
    },
    removeFromWishlist:(state,action)=> {
      const removeItem = state.wishlist.filter(
        (item) => item.id !== action.payload.id
      );
      state.wishlist = removeItem;
    
    }
  },
});

export const {addToWishlist,removeFromWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
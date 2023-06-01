import { createSlice} from "@reduxjs/toolkit";


const orderSlice = createSlice({
  name : "order",
  initialState : {
    orders : []
  },
  reducers:{
    addOrder : (state,action) => {
      state.orders.push(...action.payload);
      // console.log("reduxorder",state.orders);

      //orders:[{order_id:sscc,items:[{},{},]},{ordre2},{orer3}]
    },

    removeOrder : (state,action) => {
    }
  },
});

export const  {addOrder,removeOrder}  = orderSlice.actions;
export const selectOrder = (state) =>state.order.orders;
export default orderSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name:"auth",
  initialState:{isLoggedIn:false,user:[]},
  reducers:{
     setActiveUser : (state,action) =>{
       
      // console.log("receivedusertoredux:",action.payload);
      
      state.isLoggedIn = true;
      state.user.push({...action.payload});

      // console.log("Loggedin:",state.isLoggedIn)
      // console.log(state.user)

     },

     removeActiveUser : (state) => {
      state.isLoggedIn = false;
      state.user=[];
      // console.log("Loggedin:",state.isLoggedIn);
     },

  },
});


export const selectIsLoggedIn = (state)=>state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export const {setActiveUser,removeActiveUser} = authSlice.actions;
export default authSlice.reducer
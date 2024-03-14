import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuth: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    signInStart: (state)=>{
      state.loading = true;
      state.error = null;     
    },
    signInSuccess : (state, action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.isAuth = true;
      state.error = null;
    },
    signInFailure : (state, action)=>{
      state.loading = false;
      state.error= action.payload;
      state.isAuth = false;
    }
  }
});

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadedProducts: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name:"product",
  initialState,
  reducers:{
   
  }
});

// export const {} = productSlice.actions;
export default productSlice.reducer;
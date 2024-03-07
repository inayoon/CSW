import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    id: "",
    email: "",
    username: "",
    role: 0,
    image: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};


const userSlice = createSlice({
});

export default userSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
export type IRootState = ReturnType<typeof store.getState>

export const store = configureStore ({
  reducer:{
    user: userReducer,
  },
})
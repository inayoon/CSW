import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import productReducer from './productSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
export type IRootState = ReturnType<typeof store.getState>

const rootReducer = combineReducers({
  user: userReducer,
  product:productReducer,
})

const persistConfig= {
  key: 'root',
  storage,
  version:1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore ({
  reducer:persistedReducer, 
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
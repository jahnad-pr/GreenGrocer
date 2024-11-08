// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { adminApiSlice } from '../services/adminApi';
import { userApiSlice } from '../services/userApi';

export const store = configureStore({
  reducer: {
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminApiSlice.middleware)
      .concat(userApiSlice.middleware),
});
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApiSlice } from '../services/adminApi';

export const store = configureStore({
  reducer: {
    // Add the RTK Query user API reducer
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  // Add the API middleware for caching and refetching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});

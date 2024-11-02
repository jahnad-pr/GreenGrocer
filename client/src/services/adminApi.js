// src/services/adminApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApiSlice = createApi({
  reducerPath: 'adminApi', // Changed to avoid conflict
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: 'admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = adminApiSlice;
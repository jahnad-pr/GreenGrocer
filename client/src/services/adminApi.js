// src/services/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }), // Replace with your API URL
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: 'admin/login', // Adjust endpoint as needed
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApiSlice;

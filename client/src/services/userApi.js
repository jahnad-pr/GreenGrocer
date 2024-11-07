// src/services/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApiSlice = createApi({
  reducerPath: 'userApi', // Different reducerPath
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  endpoints: (builder) => ({

    signUp: builder.mutation({
      query: (userData) => ({
        url: 'user/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    
    login: builder.mutation({
      query: (userData) => ({
        url: 'user/login',
        method: 'POST',
        body: userData,
        credentials: 'include', // Include cookies with the request
      }),
    }),

    googleLog: builder.mutation({
      query: (userData) => ({
        url: 'user/googleLog',
        method: 'POST',
        body: userData,
        credentials: 'include',
      }),
    }),

    getUser: builder.mutation({
      query: () => ({
        url: 'user/getUser',
        method: 'GET',
        credentials: 'include',
      }),
    }),

    getOTP: builder.mutation({
      query: (email) => ({
        url: 'user/getOTP',
        method: 'POST',
        body: email,
        credentials: 'include',
      }),
    }),
    
    conformOTP: builder.mutation({
      query: ({ mail, otp }) => ({
        url: 'user/conformOTP',
        method: 'POST',
        body: { mail, otp },
        credentials: 'include',
      }),
    }),

    addDetails: builder.mutation({
      query: (userData) => ({
        url: 'user/addDetails',
        method: 'POST',
        body: userData,
        credentials: 'include',
      }),
    }),

    // categories
    getCategories: builder.mutation({
      query: () => ({
        url: 'user/getCategories',
        method: 'GET',
        credentials: 'include',
      }),
    }),

    // collection
    getCollections: builder.mutation({
      query: (id) => ({
        url: `user/getCollections/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    // products
    getProducts: builder.mutation({
      query: (id) => ({
        url: `user/getProduct/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

  }),
  
});


export const { useSignUpMutation,useLoginMutation,
               useGoogleLogMutation,useGetUserMutation,
               useGetOTPMutation,useConformOTPMutation,
               useAddDetailsMutation,useGetCategoriesMutation,
               useGetCollectionsMutation,useGetProductsMutation
              
              } = userApiSlice;
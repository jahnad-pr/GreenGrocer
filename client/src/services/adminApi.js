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

    // config

    // customers
    getCustomers: builder.mutation({
      query: () => ({
        url: 'admin/getCustomers',
        method: 'GET',
      }),
    }),

    updateUserAccess: builder.mutation({
      query: ({uniqeID,updateBool}) => ({
        url: 'admin/updateUserAccess',
        method: 'PATCH',
        body: {uniqeID,updateBool},
        credentials: 'include',
      }),
    }),

    // categories
    upsertCategory: builder.mutation({
      query: (upsertData) => ({
        url: 'admin/upsertCategory',
        method: 'PUT',
        body: upsertData,
        credentials: 'include',
      }),
    }),


    getCategories: builder.mutation({
      query: () => ({
        url: 'admin/getCategories',
        method: 'GET',
        credentials: 'include',
      }),
    }),

 
    updateCategory: builder.mutation({
      query: ({uniqeID,updateBool,action}) => ({
        url: 'admin/updateCategoryAccess',
        method: 'PATCH',
        body: {uniqeID,updateBool,action},
        credentials: 'include',
      }),
    }),

    // collection
    upsertCollection: builder.mutation({
      query: (formData) => ({
        url: 'admin/upsertCollection',
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }),
    }),

    getCollections: builder.mutation({
      query: () => ({
        url: 'admin/getCollections',
        method: 'GET',
        credentials: 'include',
      }),
    }),

    updateCollection: builder.mutation({
      query: ({uniqeID,updateBool,action}) => ({
        url: 'admin/updateCollection',
        method: 'PATCH',
        body: {uniqeID,updateBool,action},
        credentials: 'include',
      }),
    }),

    // products
    upsertProducts: builder.mutation({
      query: ({formData,id,action,Urls}) => ({
        url: 'admin/upsertProducts',
        method: 'PUT',
        body: {formData,id,action,Urls},
        credentials: 'include',
      }),
    }),

    uploadImages: builder.mutation({
      query: (formData) => ({
        url: 'admin/uploadImages',
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data', },
        credentials: 'include',
      }),
    }),

    getProducts: builder.mutation({
      query: () => ({
        url: 'admin/getProducts',
        method: 'GET',
        credentials: 'include',
      }),
    }),

    updateProduct: builder.mutation({
      query: ({uniqeID,updateBool,action}) => ({
        url: 'admin/updateProduct',
        method: 'PATCH',
        body: {uniqeID,updateBool,action},
        credentials: 'include',
      }),
    }),

  }),
});

// exporting hooks
export const { 
  useSignInMutation, 
  useGetCustomersMutation, 
  useUpdateUserAccessMutation, 
  useUpsertCategoryMutation,
  useGetCategoriesMutation ,
  useUpdateCategoryMutation,
  useUpsertCollectionMutation,
  useGetCollectionsMutation,
  useUpdateCollectionMutation,
  useUpsertProductsMutation,
  useGetProductsMutation,
  useUpdateProductMutation,
  useUploadImagesMutation

} = adminApiSlice;
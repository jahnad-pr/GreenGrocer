import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authEndpoints } from './authEndpoints';
import { customerEndpoints } from './customerEndpoints';
import { categoryEndpoints } from './categoryEndpoints';
import { collectionEndpoints } from './collectionEndpoints';
import { productEndpoints } from './productEndpoints';

export const adminApiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (builder) => ({
    ...authEndpoints(builder),
    ...customerEndpoints(builder),
    ...categoryEndpoints(builder),
    ...collectionEndpoints(builder),
    ...productEndpoints(builder),
  }),
});

export const { 
  useSignInMutation, 
  useGetAdminMutation,
  useGetCustomersMutation, 
  useUpdateUserAccessMutation, 
  useUpsertCategoryMutation,
  useGetCategoriesMutation,
  useUpdateCategoryMutation,
  useUpsertCollectionMutation,
  useGetCollectionsMutation,
  useUpdateCollectionMutation,
  useUpsertProductsMutation,
  useGetProductsMutation,
  useUpdateProductMutation,
  useUploadImagesMutation,
  useLogoutAdminMutation
} = adminApiSlice;

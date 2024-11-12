// src/services/userApi/userApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userAuthApi } from './userAuthApi';
import { userDetailsApi } from './userDetailsApi';
import { userCategoriesApi } from './userCategoriesApi';
import { userProductsApi } from './userProductsApi';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (builder) => ({
    ...userAuthApi(builder),
    ...userDetailsApi(builder),
    ...userCategoriesApi(builder),
    ...userProductsApi(builder),
  }),
});

export const { 
  useSignUpMutation,
  useLoginMutation,
  useGoogleLogMutation,
  useGetUserMutation,
  useGetOTPMutation,
  useConformOTPMutation,
  useAddDetailsMutation,
  useGetCategoriesMutation,
  useGetCollectionsMutation,
  useGetCAtegoryProductsMutation,
  useGetCAtegoryCollctiionsMutation,
  useGetCollectionProductsMutation,
  useIsUerExistMutation,
  useLogoutUserMutation
} = userApiSlice;

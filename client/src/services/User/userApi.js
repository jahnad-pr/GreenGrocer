// src/services/userApi/userApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userAuthApi } from './userAuthApi';
import { userDetailsApi } from './userDetailsApi';
import { userCategoriesApi } from './userCategoriesApi';
import { userProductsApi } from './userProductsApi';
import { AdressMangeApi } from './AddressMange';
import { userOrderApi } from './OrderManage'
import { CartManage } from './CartMange'

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (builder) => ({
    ...userAuthApi(builder),
    ...userDetailsApi(builder),
    ...userCategoriesApi(builder),
    ...userProductsApi(builder),
    ...AdressMangeApi(builder),
    ...userOrderApi(builder),
    ...CartManage(builder),
  }),
});

export const { 
  useSignUpMutation,
  useLoginMutation,
  useGoogleLogMutation,

  useGetUserMutation,
  useIsUerExistMutation,

  useGetOTPMutation,
  useConformOTPMutation,
  useAddDetailsMutation,

  useGetCategoriesMutation,
  useGetCAtegoryProductsMutation,
  useGetCAtegoryCollctiionsMutation,
  
  useGetCollectionsMutation, 
  useGetCollectionProductsMutation,
  
  useMatchPasswordMutation,
  useUpdateProfileMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,

  useUpsertAddressMutation,
  useGetAdressesMutation,

  useGetProductDetailsMutation,

  usePlaceOrderMutation,
  useGetOdersMutation,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,

  useAddtoCartMutation,
  useCheckPorductInCartMutation,
  useGetCartItemsMutation,

} = userApiSlice;

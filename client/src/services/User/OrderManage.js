// src/services/userApi/userCategoriesApi.js
export const userOrderApi = (builder) => ({

    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: 'user/placeOrder',
        method: 'POST',
        body:orderData,
        credentials: 'include',
      }),
    }),

    getOders: builder.mutation({
      query: (id) => ({
        url: `user/getOders/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),


  });
  
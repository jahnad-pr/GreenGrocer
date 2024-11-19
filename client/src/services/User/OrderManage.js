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

    updateOrderStatus: builder.mutation({
      query: (statusData) => ({
        url: `admin/updateOrderStatus`,
        method: 'POST',
        body:statusData,
        credentials: 'include',
      }),
    }),

    cancelOrder: builder.mutation({
      query: (cancelId) => ({
        url: `admin/cancelOrder`,
        method: 'POST',
        body:{ cancelId },
        credentials: 'include',
      }),
    }),


  });
  
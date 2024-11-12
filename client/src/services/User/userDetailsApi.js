// src/services/userApi/userDetailsApi.js
export const userDetailsApi = (builder) => ({
    addDetails: builder.mutation({
      query: (userData) => ({
        url: 'user/addDetails',
        method: 'POST',
        body: userData,
        credentials: 'include',
      }),
    }),
  });
  
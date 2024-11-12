// src/services/userApi/userProductsApi.js
export const userProductsApi = (builder) => ({
    getCollections: builder.mutation({
      query: (id) => ({
        url: `user/getCollections/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
  
    getCAtegoryProducts: builder.mutation({
      query: (id) => ({
        url: `user/getCAtegoryProducts/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    getCAtegoryCollctiions: builder.mutation({
      query: (id) => ({
        url: `user/getCAtegoryCollctiions/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    getCollectionProducts: builder.mutation({
      query: (id) => ({
        url: `user/getCollectionProducts/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

  });
  
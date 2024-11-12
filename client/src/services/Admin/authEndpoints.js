export const authEndpoints = (builder) => ({
  signIn: builder.mutation({
    query: (credentials) => ({
      url: 'admin/login',
      method: 'POST',
      body: credentials,
      credentials: 'include',
    }),
  }),
  getAdmin: builder.mutation({
    query: () => ({
      url: 'admin/getAdmin',
      method: 'GET',
      credentials: 'include',
    }),
  }),
});

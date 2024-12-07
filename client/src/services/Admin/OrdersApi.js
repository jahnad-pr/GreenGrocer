export const orderEndpoints = (builder) => ({

    getAllOrders: builder.mutation({
        query: () => ({
            url: 'admin/getAllOrders',
            method: 'GET',
            credentials: 'include',
        }),
    }),


});

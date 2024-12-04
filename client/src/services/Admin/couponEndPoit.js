export const couponEndpoints = (builder) => ({

    updateCoupon: builder.mutation({
        query: (formData) => ({
            url: 'admin/updateCoupon',
            method: 'PUT',
            body: formData,
            credentials: 'include',
        }),
    }),


    getAllCoupons: builder.mutation({
        query: () => ({
            url: 'admin/getAllCoupons',
            method: 'GET',
            credentials: 'include',
        }),
    }),

});

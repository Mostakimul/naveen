import { baseApi } from '../api/baseApi';

const managerSaleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSale: builder.mutation({
      query: (data) => ({
        url: '/sales/add-sale',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['sale'],
    }),
    getMySales: builder.query({
      query: () => ({
        url: '/sales/my-sales',
        method: 'GET',
      }),
      providesTags: ['my-sale'],
    }),
  }),
});

export const { useAddSaleMutation, useGetMySalesQuery } = managerSaleApi;

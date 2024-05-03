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
  }),
});

export const { useAddSaleMutation } = managerSaleApi;

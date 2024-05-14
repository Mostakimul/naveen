import { baseApi } from '../api/baseApi';

const saleManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSales: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        for (const key in args) {
          if (args.hasOwnProperty(key)) {
            params.append(key, args[key]);
          }
        }

        return {
          url: '/sales',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ['sale'],
    }),
  }),
});

export const { useGetAllSalesQuery } = saleManagementApi;

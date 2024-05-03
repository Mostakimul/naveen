import { baseApi } from '../api/baseApi';

const saleManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSales: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
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

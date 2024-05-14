import { baseApi } from '../api/baseApi';

const storeManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStores: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: '/store',
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
      providesTags: ['store'],
    }),
    createStore: builder.mutation({
      query: (data) => ({
        url: '/store/create-store',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['store', 'meta'],
    }),
    deleteStore: builder.mutation({
      query: (id) => ({
        url: `/store/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['store'],
    }),
  }),
});

export const {
  useCreateStoreMutation,
  useGetAllStoresQuery,
  useDeleteStoreMutation,
} = storeManagementApi;

import { baseApi } from '../api/baseApi';

const saleManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateRequestItem: builder.mutation({
      query: ({ reqId, data }) => {
        return {
          url: `/requests/${reqId}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => [
        'item',
        {
          type: 'singleItem',
          id: arg.reqId,
        },
      ],
    }),
    getAllRequestItem: builder.query({
      query: () => {
        return {
          url: `/requests`,
          method: 'GET',
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: ['item'],
    }),
    getSingleRequestItem: builder.query({
      query: (id) => {
        return {
          url: `/requests/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: (result, error, arg) => [
        {
          type: 'singleItem',
          id: arg.id,
        },
      ],
    }),
  }),
});

export const {
  useGetAllRequestItemQuery,
  useUpdateRequestItemMutation,
  useGetSingleRequestItemQuery,
} = saleManagementApi;

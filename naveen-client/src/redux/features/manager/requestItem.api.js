import { baseApi } from '../api/baseApi';

const requestItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createItemRequest: builder.mutation({
      query: (data) => ({
        url: '/requests/send-request',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['item'],
    }),

    getMyRequestItem: builder.query({
      query: () => {
        return {
          url: `/requests/my-request`,
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
  }),
});

export const { useCreateItemRequestMutation, useGetMyRequestItemQuery } =
  requestItemApi;

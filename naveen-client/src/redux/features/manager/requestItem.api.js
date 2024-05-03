import { baseApi } from '../api/baseApi';

const requestItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllUsers: builder.query({
    //   query: (args) => {
    //     console.log(args);
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((item) => {
    //         params.append(item.name, item.value);
    //       });
    //     }

    //     return {
    //       url: '/user',
    //       method: 'GET',
    //       params: params,
    //     };
    //   },
    //   transformResponse: (response) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    //   providesTags: ['user'],
    // }),
    createItemRequest: builder.mutation({
      query: (data) => ({
        url: '/requests/send-request',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['item'],
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
    }),
  }),
});

export const {
  useCreateItemRequestMutation,
  useGetSingleRequestItemQuery,
  useGetMyRequestItemQuery,
  useGetAllRequestItemQuery,
} = requestItemApi;

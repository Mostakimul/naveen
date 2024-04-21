import { baseApi } from '../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: '/user',
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
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: '/user/create-admin',
        method: 'POST',
        body: data,
      }),
    }),
    createManager: builder.mutation({
      query: (data) => ({
        url: '/user/create-manager',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateAdminMutation,
  useCreateManagerMutation,
} = userManagementApi;

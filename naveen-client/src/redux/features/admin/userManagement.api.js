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
      providesTags: ['user'],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: '/user/create-admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    createManager: builder.mutation({
      query: (data) => ({
        url: '/user/create-manager',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    softDeleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/soft-delete/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['user'],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        const { userId, ...rest } = data;
        return {
          url: `/user/${userId}`,
          method: 'PATCH',
          body: rest,
        };
      },
      invalidatesTags: (result, error, arg) => {
        'user', { type: 'user', userId: arg.userId };
      },
    }),
    getSingleUser: builder.query({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: ['user'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateAdminMutation,
  useCreateManagerMutation,
  useSoftDeleteUserMutation,
  useUpdateUserMutation,
  useGetSingleUserQuery,
} = userManagementApi;

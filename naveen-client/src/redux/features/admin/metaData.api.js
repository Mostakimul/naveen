import { baseApi } from '../api/baseApi';

const metaDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: () => {
        return {
          url: '/meta',
          method: 'GET',
        };
      },
      transformResponse: (response) => {
        return {
          meta: response.data,
        };
      },
      providesTags: ['meta'],
    }),
  }),
});

export const { useGetMetaDataQuery } = metaDataApi;

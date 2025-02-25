import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PaymentApi = createApi({
  reducerPath: 'paymentapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5555/',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    signup: build.mutation({
      query: (credentials) => ({
        url: '/signup/register',
        method: 'POST',
        body: credentials
      })
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: '/signup/login',
        method: 'POST',
        body: credentials
      })
    }),

    add: build.mutation({
      query: ({ formData }) => ({
        url: `/payment/add/file`,
        method: 'POST',
        body: formData,
      }),
    }),

    // get: build.query({  // ✅ Changed from mutation to query since it's a GET request
    //   query: () => ({
    //     url: `/getfile`,
    //   }),
    // }),
  }),
});

export const {
//   useAddMutation,
//   useGetQuery,  // ✅ Changed from `useGetMutation` to `useGetQuery`
  useLoginMutation,
  useSignupMutation
} = PaymentApi;

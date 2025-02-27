import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PaymentApi = createApi({
  reducerPath: 'paymentapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5555/',
    prepareHeaders: (headers) => {
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
        url: '/register',
        method: 'POST',
        body: credentials
      })
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    }),

    add: build.mutation({
      query: (formData) => ({
        url: '/details',
        method: 'POST',
        body: formData,
        formData: true, // Ensure correct handling of multipart form data
      }),
    }),
  }),
});

export const {
  useAddMutation,
  useLoginMutation,
  useSignupMutation
} = PaymentApi;

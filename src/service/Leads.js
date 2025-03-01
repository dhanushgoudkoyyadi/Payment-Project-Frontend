import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PaymentApi = createApi({
  reducerPath: 'paymentapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7777/',
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
    getUsers:build.query({
      query:()=>"/users",
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    }),
    addPayment:build.mutation({
      query:({userId,amount})=>({
        url:`/add-payment`,
        method:'POST',
        body:  {userId,amount},
      }),
    }),

    add: build.mutation({
      query: (formData) => ({
        url: '/details',
        method: 'POST',
        body: formData,
        formData: true, 
      }),
    }),

    get:build.mutation({
      query: () => ({
        url: `/getdetails`,
        method: 'GET',
        
      })
    }),
    getOne: build.query({
      query: (userId) => `/users/${userId}`, 
    }),

  }),
  
});

export const {
  useAddMutation,
  useLoginMutation,
  useSignupMutation,
  useGetUsersQuery,
  useAddPaymentMutation,useGetOneQuery
} = PaymentApi;
 
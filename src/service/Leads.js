import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PaymentApi = createApi({
  reducerPath: 'paymentapi',
  baseQuery: fetchBaseQuery({
<<<<<<< HEAD
    baseUrl: 'http://localhost:5547/',
=======
    baseUrl: 'http://localhost:5557/',
>>>>>>> 14f6f8b061dc2904a602a09d5226c7877c8ce043
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
    getUsers: build.query({
      query: () => "/users",
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    }),
    addPayment: build.mutation({
      query: ({ userId, amount }) => ({
        url: `/add-payment`,
        method: 'POST',
        body: { userId, amount },
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

    
    getOne: build.query({
      query: (userId) => `/users/${userId}`,
    }),
    addup: build.mutation({
      query: (formData) => ({
        url: '/addnewcourse',
        method: 'POST',
        body: formData,
        formData: true,
      })
    }),



  }),

});

export const {
  useAddMutation,
  useLoginMutation,
  useSignupMutation,
  useGetUsersQuery,
<<<<<<< HEAD
  useAddPaymentMutation, 
  useGetOneQuery
=======
  useAddPaymentMutation,useGetOneQuery,
  useAddupMutation
>>>>>>> 14f6f8b061dc2904a602a09d5226c7877c8ce043
} = PaymentApi;

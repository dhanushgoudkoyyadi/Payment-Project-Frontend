import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildQueries } from '@testing-library/dom';

export const PaymentApi = createApi({
  reducerPath: 'paymentapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5557/',
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
    addCohort: build.mutation({
      query: ({ title }) => ({
        url: `/addcohort`,
        method: 'POST',
        body: {title} ,
      }),
    }),
    getAllCohortsLists:build.query({
      query:()=>"/listcohorts",
    }),
    addStudent:build.mutation({
      query:({cohortTitle,studentName})=>({
        url:'/addstudent',
        method:"POST",
        body:{cohortTitle,name:studentName}
      }),
    }),

    addTech: build.mutation({
      query: (formData) => ({
        url: '/addtech',
        method: 'POST',
        body: formData,
        formData: true,
      })
    }),
    RemoveStudent: build.mutation({
      query: ({ cohortTitle, studentName }) => ({
        url: `/removeStudent`,
        method: "DELETE",
        body: { cohortTitle, studentName },
      }),
    }),
    deleteCohort:build.mutation({
      query:({id})=>({
        url:`/cohorts/${id}`,
        method:'DELETE',
      })
    }),
    updateCohort:build.mutation({
      query:({id,title})=>({
        url:`/cohortupdate/${id}`,
        method:'PUT',
        body:{title},
      })
    })


  }),

});

export const {
  useAddMutation,
  useLoginMutation,
  useSignupMutation,
  useGetUsersQuery,
  useAddPaymentMutation,
  useGetOneQuery,
  useAddupMutation,
  useAddCohortMutation,
  useGetAllCohortsListsQuery,
 useAddStudentMutation,
  useAddTechMutation,
  useRemoveStudentMutation,
  useDeleteCohortMutation,
  useUpdateCohortMutation
  
} = PaymentApi;

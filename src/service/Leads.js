import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PaymentApi = createApi({
  reducerPath: 'paymentapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:6788/',
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
        body: { title },
      }),
    }),
    getAllCohortsLists: build.query({
      query: () => "/listcohorts",
    }),
    addStudent: build.mutation({
      query: ({ cohortTitle, studentName }) => ({
        url: '/addstudent',
        method: "POST",
        body: { cohortTitle, name: studentName }
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
    deleteCohort: build.mutation({
      query: ({ id }) => ({
        url: `/cohorts/${id}`,
        method: 'DELETE',
      })
    }),
    updateCohort: build.mutation({
      query: ({ id, title }) => ({
        url: `/cohortupdate/${id}`,
        method: 'PUT',
        body: { title },
      })
    }),
    // Updated AddStudentsToCohort mutation
    AddStudentsToCohort: build.mutation({
      query: ({ toCohortId, studentNames, fromCohortId }) => ({
        url: "/add-students",
        method: "POST",
        body: {
          toCohortId,
          studentNames,
          fromCohortId
        },
      }),
    }),
    // Video upload endpoint
    uploadVideo: build.mutation({
      query: (formData) => ({
        url: '/upload-video',
        method: 'POST',
        body: formData,
        formData: true,
      }),
    }),
    // New endpoint to add video to cohort
    addCohortVideo: build.mutation({
      query: ({ cohortId, videoUrl, videoTitle, videoType = 'file' }) => ({
        url: '/cohort-video',
        method: 'POST',
        body: { cohortId, videoUrl, videoTitle, videoType },
      }),
    }),
    // Get videos for a specific cohort
    getCohortVideos: build.query({
      query: (cohortId) => `/cohort-videos/${cohortId}`,
    }),
    // Delete video from cohort
    deleteCohortVideo: build.mutation({
      query: ({ cohortId, videoId }) => ({
        url: `/cohort-video/${cohortId}/${videoId}`,
        method: 'DELETE',
      }),
    }),
    videoCohorts:build.mutation({
      query: ({ cohortId, videoId }) => ({
        url: '/video-cohorts',
        method: 'POST',
        body: { cohortId, videoId },
      }),
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
  useUpdateCohortMutation,
  useAddStudentsToCohortMutation,
  useUploadVideoMutation,
  useAddCohortVideoMutation,
  useGetCohortVideosQuery,
  useDeleteCohortVideoMutation,
} = PaymentApi;
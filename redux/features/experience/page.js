// src/features/experience/experienceApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const experienceApi = createApi({
  reducerPath: 'experienceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Experience'],
  endpoints: (builder) => ({
    // ✅ Create Experience
    createExperience: builder.mutation({
      query: (formData) => ({
        url: 'experienceCreate',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Experience'],
    }),

    // ✅ Get all Experiences
    getAllExperience: builder.query({
      query: () => 'experienceDisplay',
      providesTags: ['Experience'],
    }),

    // ✅ Get Experience by ID
    viewExperience: builder.query({
      query: (id) => `experienceView/${id}`,
      providesTags: (result, error, id) => [{ type: 'Experience', id }],
    }),

    // ✅ Update Experience
    updateExperience: builder.mutation({
      query: ({ id, formData }) => ({
        url: `updateExperience/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Experience'],
    }),

    // ✅ Delete Experience
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `deleteExperience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Experience'],
    }),
  }),
});

export const {
  useGetAllExperienceQuery,
  useViewExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;

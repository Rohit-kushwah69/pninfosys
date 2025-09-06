import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const learningApi = createApi({
  reducerPath: 'learningApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/' }),
  tagTypes: ['Learning'],
  endpoints: (builder) => ({
    createLearning: builder.mutation({
      query: (formData) => ({ url: 'learningCreate', method: 'POST', body: formData }),
      invalidatesTags: ['Learning'],
    }),
    getAllLearning: builder.query({
      query: () => 'learningDisplay',
      providesTags: ['Learning'],
    }),
    viewLearning: builder.query({
      query: (id) => `learningView/${id}`,
      providesTags: (result, error, id) => [{ type: 'Learning', id }],
    }),
    updateLearning: builder.mutation({
      query: ({ id, formData }) => ({ url: `updateLearning/${id}`, method: 'PUT', body: formData }),
      invalidatesTags: ['Learning'],
    }),
    deleteLearning: builder.mutation({
      query: (id) => ({ url: `deleteLearning/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Learning'],
    }),
  }),
});

export const {
  useCreateLearningMutation,
  useGetAllLearningQuery,
  useViewLearningQuery,
  useUpdateLearningMutation,
  useDeleteLearningMutation,
} = learningApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/',
    prepareHeaders: (headers) => {
      // Ensure server accepts JSON and form-data
      return headers;
    },
  }),
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    // ✅ Create Course (multipart/form-data)
    createCourse: builder.mutation({
      query: (formData) => ({
        url: 'courseCreate',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Course'],
    }),

    // ✅ Get all courses 
    getAllCourses: builder.query({
      query: () => 'courseDisplay',
      providesTags: ['Course'],
    }),
    // ✅ Get course by ID
    viewCourse: builder.query({
      query: (id) => `courseView/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),

    // ✅ Update Course (multipart/form-data)
    updateCourse: builder.mutation({
      query: ({ id, formData }) => ({
        url: `updateCourse/${id}`,
        method: 'PUT', // use PUT for updates
        body: formData,
      }),
      invalidatesTags: ['Course'],
    }),

    // ✅ Delete Course
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `deleteCourse/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useViewCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;

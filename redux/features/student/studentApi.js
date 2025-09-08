// src/features/student/studentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/',
        prepareHeaders: (headers) => {
            return headers
        },
    }),
    tagTypes: ['Student'],
    endpoints: (builder) => ({
        // ✅ Create Student
        createStudent: builder.mutation({
            query: (formData) => ({
                url: 'studentCreate',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Student'],
        }),

        // ✅ Get all Students
        getAllStudent: builder.query({
            query: () => 'studentDisplay',
            providesTags: ['Student'],
        }),

        // ✅ Get Student by ID
        viewStudent: builder.query({
            query: (id) => `studentView/${id}`,
            providesTags: (result, error, id) => [{ type: 'Student', id }],
        }),

        // ✅ Update Student
        updateStudent: builder.mutation({
            query: ({ id, formData }) => ({
                url: `updateStudent/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Student'],
        }),

        // ✅ Delete Student
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `deleteStudent/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Student'],
        }),
    }),
})

export const {
    useCreateStudentMutation,
    useGetAllStudentQuery,
    useViewStudentQuery,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
} = studentApi

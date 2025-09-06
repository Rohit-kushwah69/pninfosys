import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseEnquiryApi = createApi({
  reducerPath: 'courseEnquiryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['CourseEnquiry'],
  endpoints: (builder) => ({
    // ✅ Create Enquiry
    createEnquiry: builder.mutation({
      query: (data) => ({
        url: 'createEnquiry',
        method: 'POST',
        body: data, // JSON data
      }),
      invalidatesTags: ['CourseEnquiry'],
    }),

    // ✅ Get all Enquiries
    getAllEnquiries: builder.query({
      query: () => 'displayEnquiry',
      providesTags: ['CourseEnquiry'],
    }),

    // ✅ Get single Enquiry by ID
    viewEnquiry: builder.query({
      query: (id) => `viewEnquiry/${id}`,
      providesTags: (result, error, id) => [{ type: 'CourseEnquiry', id }],
    }),

    // ✅ Update Enquiry
    updateEnquiry: builder.mutation({
      query: ({ id, data }) => ({
        url: `updateEnquiry/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CourseEnquiry'],
    }),

    // ✅ Delete Enquiry
    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `deleteEnquiry/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CourseEnquiry'],
    }),
  }),
});

export const {
  useCreateEnquiryMutation,
  useGetAllEnquiriesQuery,
  useViewEnquiryQuery,
  useUpdateEnquiryMutation,
  useDeleteEnquiryMutation,
} = courseEnquiryApi;

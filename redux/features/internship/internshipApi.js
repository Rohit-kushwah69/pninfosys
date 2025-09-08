// src/redux/internshipApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const internshipApi = createApi({
  reducerPath: "internshipApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/",
  }),
  tagTypes: ["Internship"],
  endpoints: (builder) => ({
    // 1. Create internship
    createInternship: builder.mutation({
      query: (formData) => ({
        url: "internshipCreate",
        method: "POST",
        body: formData, // FormData directly bhejna, Content-Type na set karein
      }),
    }),


    // 2. Get all internships
    getAllInternships: builder.query({
      query: () => "internshipDisplay",
      providesTags: ["Internship"],
    }),

    // 3. Get internship by ID
    viewInternship: builder.query({
      query: (id) => `internshipView/${id}`,
      providesTags: (result, error, id) => [{ type: "Internship", id }],
    }),

    // 4. Update internship
    updateInternship: builder.mutation({
      query: ({ id, formData }) => ({
        url: `updateInternship/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Internship"],
    }),

    // 5. Delete internship
    deleteInternship: builder.mutation({
      query: (id) => ({
        url: `deleteInternship/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Internship"],
    }),
    //bulkDeleteInternships
    bulkDeleteInternships: builder.mutation({
      query: (ids) => ({
        url: `deleteInternships`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Internship"],
    }),

    // 6. Accept internship
    acceptInternship: builder.mutation({
      query: (id) => ({
        url: `updateInternshipStatus/${id}`,
        method: "PUT",
        body: { status: "Selected" },
      }),
      invalidatesTags: ["Internship"],
    }),

    // 7. Reject internship
    rejectInternship: builder.mutation({
      query: (id) => ({
        url: `updateInternshipStatus/${id}`,
        method: "PUT",
        body: { status: "Rejected" },
      }),
      invalidatesTags: ["Internship"],
    }),
  }),
});

export const {
  useCreateInternshipMutation,
  useGetAllInternshipsQuery,
  useViewInternshipQuery,
  useUpdateInternshipMutation,
  useDeleteInternshipMutation,
  useAcceptInternshipMutation,
  useRejectInternshipMutation,
  useBulkDeleteInternshipsMutation, // ✅ added bulk delete hook
} = internshipApi;


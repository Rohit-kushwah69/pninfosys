import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    // ✅ Create Contact (multipart/form-data or JSON)
    createContact: builder.mutation({
      query: (formData) => ({
        url: 'contactCreate',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Contact'],
    }),
 
    // ✅ Get all contacts
    getAllContacts: builder.query({
      query: () => 'contactDisplay',
      providesTags: ['Contact'],
    }),

    // ✅ Get contact by ID
    viewContact: builder.query({
      query: (id) => `contactView/${id}`,
      providesTags: (result, error, id) => [{ type: 'Contact', id }],
    }),

    // ✅ Update Contact (multipart/form-data or JSON)
    updateContact: builder.mutation({
      query: ({ id, formData }) => ({
        url: `updateContact/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Contact'],
    }),

    // ✅ Delete Contact
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `deleteContact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useViewContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;

// src/redux/features/contactCard/page.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactCardApi = createApi({
  reducerPath: 'contactCardApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ['ContactCard'],
  endpoints: (builder) => ({
    getAllContactCards: builder.query({
      query: () => 'contactCardDisplay',
      providesTags: ['ContactCard'],
    }),
    createContactCard: builder.mutation({
      query: (formData) => ({
        url: 'contactCardCreate',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['ContactCard'],
    }),
    updateContactCard: builder.mutation({
      query: ({ id, formData }) => ({
        url: `updateContactCard/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['ContactCard'],
    }),
    deleteContactCard: builder.mutation({
      query: (id) => ({
        url: `deleteCardContact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ContactCard'],
    }),
  }),
});

export const {
  useGetAllContactCardsQuery,
  useCreateContactCardMutation,
  useUpdateContactCardMutation,
  useDeleteContactCardMutation,
} = contactCardApi;

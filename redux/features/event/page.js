import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/',
    prepareHeaders: (headers) => {
      return headers;
    },
  }), 
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    // ✅ Create Event (multipart/form-data)
    createEvent: builder.mutation({
      query: (formData) => ({
        url: 'eventCreate',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Event'],
    }),

    // ✅ Get all events
    getAllEvents: builder.query({
      query: () => 'eventDisplay',
      providesTags: ['Event'],
    }),

    // ✅ Get event by ID
    viewEvent: builder.query({
      query: (id) => `eventView/${id}`,
      providesTags: (result, error, id) => [{ type: 'Event', id }],
    }),

    // ✅ Update Event (multipart/form-data)
    updateEvent: builder.mutation({
      query: ({ id, formData }) => ({
        url: `updateEvent/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Event'],
    }),

    // ✅ Delete Event
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `deleteEvent/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useViewEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;

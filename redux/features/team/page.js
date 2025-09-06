import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Team'],
  endpoints: (builder) => ({
    // ✅ Create Team Member (multipart/form-data)
    createTeam: builder.mutation({
      query: (formData) => ({
        url: 'teamCreate',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Team'],
    }),

    // ✅ Get all team members
    getAllTeams: builder.query({
      query: () => 'teamDisplay',
      providesTags: ['Team'],
    }),

    // ✅ Get team member by ID
    viewTeam: builder.query({
      query: (id) => `teamView/${id}`,
      providesTags: (result, error, id) => [{ type: 'Team', id }],
    }),

    // ✅ Update Team Member (multipart/form-data)
    updateTeam: builder.mutation({
      query: ({ id, formData }) => ({
        url: `updateTeam/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Team'],
    }),

    // ✅ Delete Team Member
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `deleteTeam/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Team'],
    }),
  }),
});

export const {
  useGetAllTeamsQuery,
  useViewTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;

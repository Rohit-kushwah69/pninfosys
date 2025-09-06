import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const technologyApi = createApi({
    reducerPath: 'technologyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/',
    }),
    tagTypes: ['Technology'],
    endpoints: (builder) => ({
        // CREATE Technology
        createTechnology: builder.mutation({
            query: (formData) => ({
                url: 'createTechnology', // ✅ matches backend: /createTechnology
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Technology'],
        }),

        // GET ALL Technologies
        getAllTechnology: builder.query({
            query: () => 'displayTechnology', // ✅ matches backend: /displayTechnology
            providesTags: ['Technology'],
        }),

        // GET SINGLE Technology
        viewTechnology: builder.query({
            query: (id) => `viewTechnology/${id}`, // ✅ matches backend: /viewTechnology/:_id
            providesTags: (result, error, id) => [{ type: 'Technology', id }],
        }),

        // UPDATE Technology
        updateTechnology: builder.mutation({
            query: ({ id, formData }) => ({
                url: `updateTechnology/${id}`, // ✅ matches backend: /updateTechnology/:_id
                method: 'PUT', // ✅ MUST be PUT to match backend route
                body: formData,
                headers: undefined, // Let browser handle multipart/form-data
            }),
            invalidatesTags: ['Technology'],
        }),

        // DELETE Technology
        deleteTechnology: builder.mutation({
            query: (id) => ({
                url: `deleteTechnology/${id}`, // ✅ matches backend: /deleteTechnology/:_id
                method: 'DELETE',
            }),
            invalidatesTags: ['Technology'],
        }),
    }),
});

export const {
    useCreateTechnologyMutation,
    useGetAllTechnologyQuery,
    useViewTechnologyQuery,
    useUpdateTechnologyMutation,
    useDeleteTechnologyMutation,
} = technologyApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Portfolio'],
  endpoints: (builder) => ({
    // ✅ Create Portfolio (multipart/form-data)
    createPortfolio: builder.mutation({
      query: (formData) => ({
        url: 'portfolioCreate',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Portfolio'],
    }),

    // ✅ Get all portfolios
    getAllPortfolios: builder.query({
      query: () => 'portfolioDisplay',
      providesTags: ['Portfolio'],
    }),

    // ✅ Get portfolio by ID
    viewPortfolio: builder.query({
      query: (id) => `portfolioView/${id}`,
      providesTags: (result, error, id) => [{ type: 'Portfolio', id }],
    }),

    // ✅ Update Portfolio (multipart/form-data)
    updatePortfolio: builder.mutation({
      query: ({ id, formData }) => ({
        url: `portfolioUpdate/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Portfolio'],
    }),

    // ✅ Delete Portfolio
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `portfolioDelete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Portfolio'],
    }),
  }),
});

export const {
  useCreatePortfolioMutation,
  useGetAllPortfoliosQuery,
  useViewPortfolioQuery,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;

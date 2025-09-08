import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAuthApi = createApi({
    reducerPath: "adminAuthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "NEXT_PUBLIC_API_URL=https://pnserver-46dj.onrender.com/api/admin/",
        credentials: "include", // send cookies for authentication
    }),
    tagTypes: ["AdminAuth"],
    endpoints: (builder) => ({
        // ================= LOGIN =================
        loginAdmin: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["AdminAuth"],
        }),

        // ================= REGISTER =================
        registerAdmin: builder.mutation({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
            }),
        }),

        // ================= GET ADMIN PROFILE =================
        getAdminProfile: builder.query({
            query: () => ({
                url: "profile", // protected route
                method: "GET",
            }),
            providesTags: ["AdminAuth"],
        }),

        // ================= LOGOUT =================
        logoutAdmin: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            invalidatesTags: ["AdminAuth"],
        }),
    }),
});

// ✅ Auto-generated hooks
export const {
    useLoginAdminMutation,
    useRegisterAdminMutation,
    useGetAdminProfileQuery,
    useLogoutAdminMutation,
} = adminAuthApi;

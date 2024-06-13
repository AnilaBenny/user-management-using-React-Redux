import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        updateUserProfile: builder.mutation({
            query: (formData) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: formData,
            }),
        }),
        fetchUsers: builder.query({
            query: () => `${USERS_URL}/userlist`,
            transformResponse: (response) => response.users,
            providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: `${USERS_URL}/userlist`,
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USERS_URL}/userlist/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/userlist/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useUpdateUserProfileMutation,
    useFetchUsersQuery,
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation
} = usersApiSlice;

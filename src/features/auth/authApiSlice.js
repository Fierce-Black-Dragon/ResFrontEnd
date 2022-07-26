
import { apiSlice } from './../../app/api/apiScile';
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
               
                url: '/signin',
                method: 'POST',
                headers: {
                     'Access-Control-Allow-Origin': '*',
                },
                body: { ...credentials }
            })
        }),
        signup: builder.mutation({
            query: credentials => ({
                url: '/signup',
                method: 'POST',
                  headers: {
                     'Access-Control-Allow-Origin': '*',
                },
                body: { ...credentials }
            })
        }),
    })
})


export const {
    useLoginMutation,
    useSignupMutation
} = authApiSlice
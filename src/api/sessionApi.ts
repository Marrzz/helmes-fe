import { baseApi } from './baseApi'

const sessionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    initiateSession: build.mutation({
      query: () => ({
        method: 'POST',
        url: `/session`,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useInitiateSessionMutation } = sessionApi

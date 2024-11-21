import { baseApi } from './baseApi'

const sessionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    initiateSession: build.mutation({
      query: () => ({
        method: 'POST',
        url: `/session`,
      }),
    }),
    terminateSession: build.mutation({
      query: () => ({
        method: 'DELETE',
        url: `/session`,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useInitiateSessionMutation, useTerminateSessionMutation } =
  sessionApi

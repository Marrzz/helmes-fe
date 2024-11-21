import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

const SERVER_URL = import.meta.env.VITE_BE_APPLICATION_URL
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    credentials: 'include',
  }),
  tagTypes: ['Form'],
  endpoints: () => ({}),
})

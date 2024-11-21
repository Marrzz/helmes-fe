import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    credentials: 'include',
  }),
  tagTypes: ['Form'],
  endpoints: () => ({}),
})

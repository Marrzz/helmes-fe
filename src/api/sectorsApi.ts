import { SectorDto } from '../types/api'
import { baseApi } from './baseApi'

const sectorsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getSectors: build.query<SectorDto[], void>({
      query: () => ({
        method: 'GET',
        url: '/sectors',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetSectorsQuery } = sectorsApi

import { setFormValues } from '../state/formState'
import {
  GetPersonSectorsResponse,
  SavePersonSectorsRequest,
  UpdatePersonSectorsRequest,
} from '../types/api'
import { baseApi } from './baseApi'

const sectorsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    savePersonSectors: build.mutation<void, SavePersonSectorsRequest>({
      query: body => ({
        method: 'POST',
        url: '/person',
        body,
      }),
      invalidatesTags: ['Form'],
    }),
    updatePersonSectors: build.mutation<void, UpdatePersonSectorsRequest>({
      query: body => ({
        method: 'PUT',
        url: '/person',
        body,
      }),
      invalidatesTags: ['Form'],
    }),
    getPersonSectors: build.query<GetPersonSectorsResponse, void>({
      query: () => ({
        method: 'GET',
        url: '/person',
      }),
      providesTags: ['Form'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(setFormValues(data))
        } catch (error) {
          console.error('Error fetching posts:', error)
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPersonSectorsQuery,
  useUpdatePersonSectorsMutation,
  useSavePersonSectorsMutation,
} = sectorsApi

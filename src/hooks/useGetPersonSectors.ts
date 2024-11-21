import { useGetPersonSectorsQuery } from '../api/personSectorsApi'

export const useGetPersonSectors = () => {
  const { data, isError, isLoading, isSuccess } = useGetPersonSectorsQuery()

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  }
}

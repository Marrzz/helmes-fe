import { useUpdatePersonSectorsMutation } from '../api/personSectorsApi'
import { mapToSaveRequest } from '../services/sectorsMapper'
import { PersonSectorsFields } from '../types/sectors'

export const useUpdatePersonSectors = () => {
  const [execute, { isError, isLoading, isSuccess }] =
    useUpdatePersonSectorsMutation()

  const run = (formValues: PersonSectorsFields) => {
    const request = mapToSaveRequest(formValues)
    execute(request).unwrap()
  }

  return {
    execute: run,
    isError,
    isLoading,
    isSuccess,
  }
}

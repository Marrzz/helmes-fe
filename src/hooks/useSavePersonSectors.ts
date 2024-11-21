import { useDispatch } from 'react-redux'
import { useSavePersonSectorsMutation } from '../api/personSectorsApi'
import { mapToSaveRequest } from '../services/sectorsMapper'
import { PersonSectorsFields } from '../types/sectors'
import { setFormValues } from '../state/formState'

export const useSavePersonSectors = () => {
  const dispatch = useDispatch()
  const [execute, { isLoading, isSuccess, isError }] =
    useSavePersonSectorsMutation()

  const run = (formValues: PersonSectorsFields) => {
    const request = mapToSaveRequest(formValues)
    execute(request)
      .unwrap()
      .then(() => {
        if (isSuccess) {
          dispatch(setFormValues(formValues))
        }
      })
  }

  return {
    execute: run,
    isLoading,
    isSuccess,
    isError,
  }
}

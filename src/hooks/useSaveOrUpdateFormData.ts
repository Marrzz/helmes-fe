import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useSavePersonSectors } from './useSavePersonSectors'
import { useUpdatePersonSectors } from './useUpdatePersonSectors'
import { PersonSectorsFields } from '../types/sectors'

export const useSaveOrUpdateFormData = () => {
  const isPersonEditing = useSelector(
    (state: RootState) => state.form.formValues.id,
  )
  const {
    execute: saveData,
    isLoading: isSaveLoading,
    isSuccess: isSaveSuccess,
    isError: isSaveError,
  } = useSavePersonSectors()
  const {
    execute: updateData,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = useUpdatePersonSectors()

  const execute = (formValues: PersonSectorsFields) => {
    if (isPersonEditing) {
      updateData(formValues)
      return
    }

    saveData(formValues)
  }

  return {
    isLoading: isSaveLoading || isUpdateLoading,
    isError: isSaveError || isUpdateError,
    isSuccess: isSaveSuccess || isUpdateSuccess,
    execute,
  }
}

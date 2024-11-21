import { object, string, array, boolean } from 'yup'
import { useGetPersonSectors } from './useGetPersonSectors'

export const usePersonSectorsForm = () => {
  const { data, isSuccess, isLoading } = useGetPersonSectors()
  const validationSchema = object({
    name: string()
      .required('Name is a required field')
      .test(
        'not-empty',
        'Name cannot be blank or only whitespace',
        value => value?.trim().length > 0,
      ),
    sectors: array().min(1, 'You must select at least one sector'),
    agreeToTerms: boolean().oneOf([true], 'You must agree to the terms!'),
  })

  if (!isLoading && isSuccess) {
    const initialValues = {
      name: data?.name || '',
      sectors:
        data?.sectors.map(({ name, id }) => ({
          label: name,
          value: id,
        })) || [],
      agreedToTerms: data?.hasAgreedToTerms || false,
    }

    return { initialValues, validationSchema }
  }

  const initialValues = {
    name: '',
    sectors: [],
    agreedToTerms: false,
  }

  return { initialValues, validationSchema, isLoading }
}

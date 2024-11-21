import { Form, Formik } from 'formik'
import { Checkbox } from './components/Checkbox'
import { Input } from './components/Input'
import { SectorSelect } from './components/SectorSelect'
import { useGetSectorOptions } from './hooks/useGetSectorOptions'
import { useSession } from './hooks/useSession'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { usePersonSectorsForm } from './hooks/usePersonSectorsForm'
import { useSaveOrUpdateFormData } from './hooks/useSaveOrUpdateFormData'

const App = () => {
  const { initiateSession } = useSession()
  const { data, isLoading: sectorsLoading } = useGetSectorOptions()

  const {
    execute,
    isLoading: isSaveLoading,
    isSuccess: isSaveSuccess,
    isError: isSaveError,
  } = useSaveOrUpdateFormData()
  const {
    initialValues,
    validationSchema,
    isLoading: isFormLoading,
  } = usePersonSectorsForm()

  useEffect(() => {
    initiateSession()
  }, [])

  useEffect(() => {
    if (isSaveSuccess) {
      toast.success('Response saved!', {
        duration: 4000,
        position: 'top-right',
        icon: '👏',
      })
    }

    if (isSaveError) {
      toast.error('Something went wrong!', {
        duration: 4000,
        position: 'top-right',
        icon: '😟',
      })
    }
  }, [isSaveSuccess, isSaveError])

  if (sectorsLoading || isFormLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <h1 className='bg-blue-500 text-white'>
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={execute}
      >
        {({ values, setFieldValue, errors, touched, isValid }) => (
          <Form className='flex flex-col gap-4 items-start px-4'>
            <Input
              label='Name'
              value={values.name}
              onChange={setFieldValue}
              error={touched.name && Boolean(errors.name)}
              errorText={errors.name}
            />
            <SectorSelect
              label='Sectors'
              options={data}
              value={values.sectors}
              onChange={setFieldValue}
              error={touched.sectors && Boolean(errors.sectors)}
              errorText={errors.sectors}
            />
            <Checkbox
              label='Agree to terms'
              value={values.agreedToTerms}
              onChange={setFieldValue}
              error={touched.agreedToTerms && Boolean(errors.agreedToTerms)}
              errorText={errors.agreedToTerms}
            />
            <button
              disabled={!isValid || isSaveLoading}
              type='submit'
              className='text-sm/6 text-white font-medium px-4 py-2 bg-blue-400 rounded disabled:opacity-75'
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default App

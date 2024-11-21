import { createSlice } from '@reduxjs/toolkit'
import { PersonSectorsFields } from '../types/sectors'
import { Option } from '../types/form'

interface InitialFormState {
  id?: string
  name?: string
  agreedToTerms: boolean
  sectors: Option[]
}
interface InitialState {
  formValues: InitialFormState
}

const initialState: InitialState = {
  formValues: {
    name: '',
    agreedToTerms: false,
    sectors: [],
  },
}

const formSlice = createSlice({
  name: 'from',
  initialState,
  reducers: {
    setFormValues: (state, action) => {
      const payload: PersonSectorsFields = action.payload
      state.formValues = payload
    },
  },
})

export const { setFormValues } = formSlice.actions

export default formSlice.reducer

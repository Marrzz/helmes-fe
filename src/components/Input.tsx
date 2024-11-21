import { Field, Label, Input as HeadlessInput } from '@headlessui/react'
import { ReactComponent } from '../types/react'
import { BaseFormField } from '../types/form'

interface Props extends BaseFormField {
  label: string
}

export const Input: ReactComponent<Props> = ({
  label,
  value,
  onChange,
  error,
  errorText = '',
}) => {
  return (
    <Field className='flex flex-col gap-2'>
      <Label className="text-sm/6 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
        {label}
      </Label>
      <HeadlessInput
        value={value}
        onChange={({ target }) => onChange('name', target.value, true)}
        className='border rounded border-2 border-blue-400'
      />
      {error && <p className='text-red-500 font-bold'>{errorText}</p>}
    </Field>
  )
}

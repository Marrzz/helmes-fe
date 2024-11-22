import { Field, Checkbox as HeadlessCheckbox, Label } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import { ReactComponent } from '../types/react'
import { BaseFormField } from '../types/form'

interface Props extends BaseFormField {
  label: string
}

export const Checkbox: ReactComponent<Props> = ({
  label,
  onChange,
  value,
  error,
  errorText,
}) => (
  <Field className='flex items-center gap-2'>
    <HeadlessCheckbox
      value={value}
      checked={value}
      onChange={val => onChange('agreedToTerms', val, true)}
      className='group relative block w-4 h-4 rounded border border-blue-400 bg-white focus:ring-2 
                focus:ring-offset-1 data-[checked]:bg-blue-400'
    >
      <div
        className='absolute inset-0 flex items-center justify-center pointer-events-none'
        aria-hidden='true'
      >
        {value && (
          <CheckIcon
            className='hidden w-3 h-3 text-white group-data-[checked]:block'
            data-testid='check-icon'
          />
        )}
      </div>
    </HeadlessCheckbox>
    <Label className='text-sm leading-6 font-medium'>{label}</Label>
    {error && <p className='text-red-500 font-bold'>{errorText}</p>}
  </Field>
)

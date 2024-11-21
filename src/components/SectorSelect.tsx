import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from '@headlessui/react'
import { ReactComponent } from '../types/react'
import { BaseFormField, type SectorOption } from '../types/form'
import { useMemo, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { MultiSelectBadge } from './MultiSelectBadge'
import clsx from 'clsx'
import { searchMatches, toggleSelection } from '../util/sectorHelpers'

interface Props extends BaseFormField {
  label: string
  options: SectorOption[]
}

export const SectorSelect: ReactComponent<Props> = ({
  options,
  label,
  onChange,
  value,
  error,
  errorText,
}) => {
  const [search, setSearch] = useState('')
  const optionsElements = useMemo(
    () => renderOptions(options, value, search),
    [options, value, search],
  )

  const removeOption = (item: SectorOption) => {
    const updatedValue = value.filter(
      (el: SectorOption) => el.value !== item.value,
    )
    onChange('sectors', updatedValue, true)
  }

  const onSelect = (v: SectorOption[]) => {
    const options = toggleSelection(value, v[v.length - 1])
    onChange('sectors', options, true)
  }

  return (
    <Field className='flex flex-col w-80'>
      <Label className="text-sm/6 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
        {label}
      </Label>
      <Combobox multiple onChange={onSelect} value={value}>
        <div className='relative'>
          <ComboboxInput
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            className='w-full border rounded border-2 border-blue-400 px-3 py-2'
          />
          <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
            <ChevronDownIcon className='w-4 h-4 fill-black/60 group-hover:fill-black' />
          </ComboboxButton>
          <ComboboxOptions className='absolute left-0 top-full mt-1 w-full bg-white border rounded border-2 border-blue-400 shadow-lg h-40 z-10 overflow-auto'>
            {optionsElements.length ? optionsElements : <div>No Options</div>}
          </ComboboxOptions>
        </div>
        <div className='flex flex-wrap items-center gap-2 py-2'>
          {value.map((item: SectorOption, idx: number) => (
            <MultiSelectBadge
              key={`selected-${idx}`}
              item={item}
              onClick={() => removeOption(item)}
            />
          ))}
        </div>
      </Combobox>
      <p className='text-red-500 font-bold'>{error && errorText}</p>
    </Field>
  )
}

const renderOptions = (
  options: SectorOption[],
  selectedValues: SectorOption[],
  searchTerm: string,
  level = 0,
) => {
  const padding = clsx('pl-4 pt-2', { 'pl-1': level === 0 })
  return options
    .filter(option => {
      const matchesSearch =
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (option.children &&
          option.children.some(child => searchMatches(child, searchTerm)))
      return matchesSearch
    })
    .map(option => {
      const isSelected = selectedValues.some(
        selected => selected.value === option.value,
      )
      return (
        <ComboboxOption key={option.value} value={option} className={padding}>
          <input
            type='checkbox'
            checked={isSelected}
            readOnly
            className='mr-2 cursor-pointer'
          />
          {option.label}
          {option.children &&
            renderOptions(
              option.children,
              selectedValues,
              searchTerm,
              level + 1,
            )}
        </ComboboxOption>
      )
    })
}

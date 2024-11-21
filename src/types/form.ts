/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Option {
  label: string
  value: number
}

export interface SectorOption extends Option {
  children: SectorOption[]
}

export interface BaseFormField {
  value: any
  onChange: (field: string, value: any, shouldValidate?: boolean) => void
  error?: boolean
  errorText?: any
}

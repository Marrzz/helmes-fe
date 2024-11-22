import { useGetPersonSectors } from './useGetPersonSectors'
import { useGetPersonSectorsQuery } from '../api/personSectorsApi' // Adjust to import path of the query hook
import { vi, Mock } from 'vitest'
import { renderHook } from '@testing-library/react'
import { Option } from '../types/form'

// Mocking the useGetPersonSectorsQuery hook
vi.mock('../api/personSectorsApi', () => ({
  useGetPersonSectorsQuery: vi.fn(),
}))

interface MockValue {
  data: Option[] | null
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
}

describe('useGetPersonSectors', () => {
  const mockUseGetPersonSectorsQuery = (value: MockValue) =>
    (useGetPersonSectorsQuery as Mock).mockReturnValue(value)
  it('should return isLoading true when the query is loading', () => {
    mockUseGetPersonSectorsQuery({
      data: null,
      isError: false,
      isLoading: true,
      isSuccess: false,
    })

    const { result } = renderHook(() => useGetPersonSectors())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.data).toBeNull()
  })

  it('should return isSuccess true and data when the query is successful', () => {
    const mockData = [
      { label: 'Sector 1', value: 1 },
      { label: 'Sector 2', value: 2 },
    ]
    mockUseGetPersonSectorsQuery({
      data: mockData,
      isError: false,
      isLoading: false,
      isSuccess: true,
    })

    const { result } = renderHook(() => useGetPersonSectors())

    expect(result.current.isSuccess).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.data).toEqual(mockData)
  })

  it('should return isError true when the query fails', () => {
    mockUseGetPersonSectorsQuery({
      data: null,
      isError: true,
      isLoading: false,
      isSuccess: false,
    })

    const { result } = renderHook(() => useGetPersonSectors())

    expect(result.current.isError).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.data).toBeNull()
  })

  it('should return correct values when the query has no data', () => {
    mockUseGetPersonSectorsQuery({
      data: [],
      isError: false,
      isLoading: false,
      isSuccess: true,
    })

    const { result } = renderHook(() => useGetPersonSectors())

    expect(result.current.isSuccess).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.data).toEqual([])
  })
})

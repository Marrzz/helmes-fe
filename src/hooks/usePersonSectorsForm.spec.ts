import { usePersonSectorsForm } from './usePersonSectorsForm' // Adjust path as needed
import { useGetPersonSectors } from './useGetPersonSectors' // Adjust path as needed
import { vi, Mock } from 'vitest'
import { renderHook } from '@testing-library/react'
import { GetPersonSectorsResponse } from '../types/api'

// Mock the `useGetPersonSectors` hook
vi.mock('./useGetPersonSectors', () => ({
  useGetPersonSectors: vi.fn(),
}))

interface MockResponse {
  data?: GetPersonSectorsResponse | null
  isSuccess: boolean
  isLoading: boolean
}

describe('usePersonSectorsForm', () => {
  const mockUseGetPersonSectors = (v: MockResponse) =>
    (useGetPersonSectors as Mock).mockReturnValue(v)

  it('should return initial values and validation schema when loading', () => {
    // Mock the `useGetPersonSectors` hook to simulate loading
    mockUseGetPersonSectors({
      data: undefined,
      isSuccess: false,
      isLoading: true,
    })

    const { result } = renderHook(() => usePersonSectorsForm())

    // Assert that initial values are empty, and loading state is true
    expect(result.current.isLoading).toBe(true)
    expect(result.current.initialValues).toEqual({
      name: '',
      sectors: [],
      agreedToTerms: false,
    })
    expect(result.current.validationSchema).toBeDefined()
  })

  it('should return initial values and validation schema on success', () => {
    // Mock the `useGetPersonSectors` hook to simulate success with mock data
    const mockData = {
      name: 'John Doe',
      sectors: [
        { name: 'Sector 1', id: 1 },
        { name: 'Sector 2', id: 2 },
      ],
      hasAgreedToTerms: true,
    }

    mockUseGetPersonSectors({
      data: mockData,
      isSuccess: true,
      isLoading: false,
    })

    const { result } = renderHook(() => usePersonSectorsForm())

    // Assert that initial values are populated from mock data
    expect(result.current.initialValues).toEqual({
      name: 'John Doe',
      sectors: [
        { label: 'Sector 1', value: 1 },
        { label: 'Sector 2', value: 2 },
      ],
      agreedToTerms: true,
    })
    expect(result.current.validationSchema).toBeDefined()
  })

  it('should return empty initial values if there is no data', () => {
    // Mock the `useGetPersonSectors` hook to simulate no data
    mockUseGetPersonSectors({
      data: null,
      isSuccess: false,
      isLoading: false,
    })

    const { result } = renderHook(() => usePersonSectorsForm())

    // Assert that initial values are empty
    expect(result.current.initialValues).toEqual({
      name: '',
      sectors: [],
      agreedToTerms: false,
    })
    expect(result.current.validationSchema).toBeDefined()
  })

  it('should validate "name" field correctly', async () => {
    const { result } = renderHook(() => usePersonSectorsForm())

    // Test "name" field validation with an invalid name
    try {
      await result.current.validationSchema.validate({ name: '' })
    } catch (e) {
      expect(e.message).toEqual('Name is a required field')
    }

    // Test "name" field validation with whitespace
    try {
      await result.current.validationSchema.validate({ name: '   ' })
    } catch (e) {
      expect(e.message).toEqual('Name cannot be blank or only whitespace')
    }

    // Test valid name
    await result.current.validationSchema.validate({ name: 'John Doe' })
    // If no error is thrown, the validation passed
  })

  it('should validate "sectors" field correctly', async () => {
    const { result } = renderHook(() => usePersonSectorsForm())

    // Test "sectors" field validation with no sectors selected
    try {
      await result.current.validationSchema.validate({
        name: 'John Doe',
        agreeToTerms: true,
        sectors: [],
      })
    } catch (e) {
      expect(e.message).toEqual('You must select at least one sector')
    }

    // Test "sectors" field validation with at least one sector
    await result.current.validationSchema.validate({
      sectors: [{ label: 'Sector 1', value: 1 }],
      name: 'John Doe',
      agreeToTerms: true,
    })
    // If no error is thrown, the validation passed
  })
})

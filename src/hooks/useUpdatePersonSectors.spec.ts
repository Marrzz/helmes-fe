import { useUpdatePersonSectors } from './useUpdatePersonSectors' // Adjust the path as needed
import { vi, Mock } from 'vitest'
import { useUpdatePersonSectorsMutation } from '../api/personSectorsApi'
import { PersonSectorsFields } from '../types/sectors'
import { act, renderHook } from '@testing-library/react'

// Mock the mutation hook
vi.mock('../api/personSectorsApi', () => ({
  useUpdatePersonSectorsMutation: vi.fn(),
}))

interface MockValues {
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
}

describe('useUpdatePersonSectors', () => {
  // Prepare mock form values
  const mockFormValues: PersonSectorsFields = {
    sectors: [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
    ],
    agreedToTerms: true,
    name: 'Test Name',
  }

  const mockExecute = vi.fn()

  const mockUseUpdatePersonSectorsMutation = (v: [typeof vi.fn, MockValues]) =>
    (useUpdatePersonSectorsMutation as Mock).mockReturnValue(v)

  it('should run the mutation and handle success', async () => {
    mockExecute.mockResolvedValue({ success: true })

    // Mock the mutation hook to return mockExecute and success response
    mockUseUpdatePersonSectorsMutation([
      mockExecute,
      {
        isError: false,
        isLoading: false,
        isSuccess: true,
      },
    ])

    const { result } = renderHook(() => useUpdatePersonSectors())

    // Run the hook's execute function
    await act(async () => {
      await result.current.execute(mockFormValues)
    })

    // Assert that execute was called with the correct request
    expect(mockExecute).toHaveBeenCalledWith({
      hasAgreedToTerms: true,
      name: 'Test Name',
      selectedSectors: [1, 2],
    })

    // Assert that isSuccess is true since the mutation was successful
    expect(result.current.isSuccess).toBe(true)
  })

  it('should handle loading state correctly', async () => {
    // Mock the mutation hook to return loading state
    mockUseUpdatePersonSectorsMutation([
      mockExecute,
      { isError: false, isLoading: true, isSuccess: false },
    ])

    const { result } = renderHook(() => useUpdatePersonSectors())

    // Assert that isLoading is true
    expect(result.current.isLoading).toBe(true)
  })

  it('should handle error state correctly', async () => {
    mockExecute.mockRejectedValue(new Error('Failed to update'))

    // Mock the mutation hook to return error state
    mockUseUpdatePersonSectorsMutation([
      mockExecute,
      {
        isError: true,
        isLoading: false,
        isSuccess: false,
      },
    ])

    const { result } = renderHook(() => useUpdatePersonSectors())

    // Run the hook's execute function
    await act(async () => {
      await result.current.execute(mockFormValues)
    })

    // Assert that the execute function was called
    expect(mockExecute).toHaveBeenCalled()

    // Assert that isError is true because of the failed mutation
    expect(result.current.isError).toBe(true)
  })

  it('should call the mutation with the correct payload', async () => {
    // Mock the mutation hook to return success response
    mockUseUpdatePersonSectorsMutation([
      mockExecute,
      { isError: false, isLoading: false, isSuccess: false },
    ])

    const { result } = renderHook(() => useUpdatePersonSectors())

    // Execute the mutation
    await act(async () => {
      await result.current.execute(mockFormValues)
    })

    // Ensure the execute function is called with the correct payload
    expect(mockExecute).toHaveBeenCalledWith({
      hasAgreedToTerms: true,
      name: 'Test Name',
      selectedSectors: [1, 2],
    })
  })
})

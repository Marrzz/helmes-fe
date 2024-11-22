import { useSavePersonSectors } from './useSavePersonSectors' // Adjust the import path
import { useDispatch } from 'react-redux'
import { useSavePersonSectorsMutation } from '../api/personSectorsApi'
import { setFormValues } from '../state/formState'
import { vi } from 'vitest'
import { mapToSaveRequest } from '../services/sectorsMapper'
import { act, renderHook } from '@testing-library/react'

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}))

vi.mock('../api/personSectorsApi', () => ({
  useSavePersonSectorsMutation: vi.fn(),
}))

vi.mock('../services/sectorsMapper', () => ({
  mapToSaveRequest: vi.fn(),
}))

describe('useSavePersonSectors', () => {
  const mockDispatch = vi.fn()
  const mockExecuteWithEmptyBody = vi.fn().mockResolvedValueOnce({})

  beforeEach(() => {
    // Clear previous mock calls
    mockDispatch.mockClear()
    vi.mocked(useDispatch).mockReturnValue(mockDispatch)
  })

  it('should call execute with correct parameters and dispatch setFormValues on success', async () => {
    // Prepare mock data
    const formValues = {
      name: 'John Doe',
      sectors: [{ label: 'Sector 1', value: 1 }],
      agreedToTerms: true,
    }
    const saveRequest = {
      name: 'John Doe',
      selectedSectors: [1],
      hasAgreedToTerms: true,
    }

    // Mock the mutation hook behavior
    const mockMutation = {
      isLoading: false,
      isSuccess: true,
      isError: false,
      reset: vi.fn(),
    }
    vi.mocked(useSavePersonSectorsMutation).mockReturnValue([
      mockExecuteWithEmptyBody,
      mockMutation,
    ])
    vi.mocked(mapToSaveRequest).mockReturnValue(saveRequest)

    const { result } = renderHook(() => useSavePersonSectors())

    // Run the hook function
    await act(async () => {
      await result.current.execute(formValues)
    })

    // Assert mapToSaveRequest was called correctly
    expect(mapToSaveRequest).toHaveBeenCalledWith(formValues)

    // Assert execute was called with the correct argument
    expect(mockExecuteWithEmptyBody).toHaveBeenCalledWith(saveRequest)

    // Assert dispatch was called with the setFormValues action
    expect(mockDispatch).toHaveBeenCalledWith(setFormValues(formValues))
  })

  it('should not dispatch setFormValues if mutation is not successful', async () => {
    const formValues = { name: 'John Doe', sectors: [], agreedToTerms: true }
    const saveRequest = {
      name: 'John Doe',
      selectedSectors: [],
      hasAgreedToTerms: true,
    }

    // Mock mutation response: mutation is not successful
    const mockExecute = vi.fn().mockResolvedValueOnce({
      data: undefined, // No data returned for unsuccessful response
    })
    const mockMutation = {
      isLoading: false,
      isSuccess: false,
      isError: false,
      reset: vi.fn(),
    }

    vi.mocked(useSavePersonSectorsMutation).mockReturnValue([
      mockExecute,
      mockMutation,
    ])
    vi.mocked(mapToSaveRequest).mockReturnValue(saveRequest)

    const { result } = renderHook(() => useSavePersonSectors())

    // Act and trigger mutation
    await act(async () => {
      await result.current.execute(formValues)
    })

    // Assert that dispatch was not called since the mutation was unsuccessful
    expect(mockDispatch).not.toHaveBeenCalled()
    expect(mockExecute).toHaveBeenCalledWith(saveRequest) // Ensure execute was called with the correct request
  })
})

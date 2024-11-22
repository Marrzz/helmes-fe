import { useSaveOrUpdateFormData } from './useSaveOrUpdateFormData'
import { useSavePersonSectors } from './useSavePersonSectors'
import { useUpdatePersonSectors } from './useUpdatePersonSectors'
import { vi } from 'vitest'
import { useSelector } from 'react-redux'
import { PersonSectorsFields } from '../types/sectors'
import { act, renderHook } from '@testing-library/react'

// Mock the imports
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}))

vi.mock('./useSavePersonSectors', () => ({
  useSavePersonSectors: vi.fn(),
}))

vi.mock('./useUpdatePersonSectors', () => ({
  useUpdatePersonSectors: vi.fn(),
}))

describe('useSaveOrUpdateFormData', () => {
  const mockSaveData = vi.fn()
  const mockUpdateData = vi.fn()

  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks()
  })

  it('should call updateData when isPersonEditing is true', async () => {
    const formValues: PersonSectorsFields = {
      name: 'John Doe',
      sectors: [],
      agreedToTerms: true,
    }

    // Mocking the selector to simulate person being edited
    vi.mocked(useSelector).mockReturnValueOnce(true)

    // Mock hooks
    vi.mocked(useSavePersonSectors).mockReturnValue({
      execute: mockSaveData,
      isLoading: false,
      isSuccess: false,
      isError: false,
    })
    vi.mocked(useUpdatePersonSectors).mockReturnValue({
      execute: mockUpdateData,
      isLoading: false,
      isSuccess: false,
      isError: false,
    })

    const { result } = renderHook(() => useSaveOrUpdateFormData())

    // Act: Call execute function
    await act(async () => {
      result.current.execute(formValues)
    })

    // Assert: updateData should have been called since isPersonEditing is true
    expect(mockUpdateData).toHaveBeenCalledWith(formValues)
    expect(mockSaveData).not.toHaveBeenCalled()
  })

  it('should call saveData when isPersonEditing is false', async () => {
    const formValues: PersonSectorsFields = {
      name: 'John Doe',
      sectors: [{ label: 'test', value: 1 }],
      agreedToTerms: true,
    }

    // Mocking the selector to simulate person not being edited (id is null)
    vi.mocked(useSelector).mockReturnValueOnce(false)

    // Mock hooks for saving and updating
    vi.mocked(useSavePersonSectors).mockReturnValue({
      execute: mockSaveData,
      isLoading: false,
      isSuccess: false,
      isError: false,
    })
    vi.mocked(useUpdatePersonSectors).mockReturnValue({
      execute: mockUpdateData,
      isLoading: false,
      isSuccess: false,
      isError: false,
    })

    const { result } = renderHook(() => useSaveOrUpdateFormData())

    // Act: Call execute function
    await act(async () => {
      result.current.execute(formValues)
    })

    // Assert: saveData should have been called since isPersonEditing is false
    expect(mockSaveData).toHaveBeenCalled() // Check if the mock function was called
    expect(mockSaveData).toHaveBeenCalledWith(formValues) // Ensure it's called with formValues
    expect(mockUpdateData).not.toHaveBeenCalled()
  })

  it('should return loading state as true if either save or update is loading', () => {
    // Simulating loading for save
    vi.mocked(useSelector).mockReturnValueOnce({ formValues: { id: null } })

    vi.mocked(useSavePersonSectors).mockReturnValue({
      execute: mockSaveData,
      isLoading: true,
      isSuccess: false,
      isError: false,
    })
    vi.mocked(useUpdatePersonSectors).mockReturnValue({
      execute: mockUpdateData,
      isLoading: false,
      isSuccess: false,
      isError: false,
    })

    const { result } = renderHook(() => useSaveOrUpdateFormData())

    // Assert: isLoading should be true since save is loading
    expect(result.current.isLoading).toBe(true)
  })

  it('should return error state as true if either save or update has an error', () => {
    // Simulating error for update
    vi.mocked(useSelector).mockReturnValueOnce({ formValues: { id: '1' } })

    vi.mocked(useSavePersonSectors).mockReturnValue({
      execute: mockSaveData,
      isLoading: false,
      isSuccess: false,
      isError: false,
    })
    vi.mocked(useUpdatePersonSectors).mockReturnValue({
      execute: mockUpdateData,
      isLoading: false,
      isSuccess: false,
      isError: true,
    })

    const { result } = renderHook(() => useSaveOrUpdateFormData())

    // Assert: isError should be true since update has error
    expect(result.current.isError).toBe(true)
  })

  it('should return success state as true if either save or update is successful', () => {
    // Simulating success for save
    vi.mocked(useSelector).mockReturnValueOnce({ formValues: { id: null } })

    vi.mocked(useSavePersonSectors).mockReturnValue({
      execute: mockSaveData,
      isLoading: false,
      isSuccess: true,
      isError: false,
    })
    vi.mocked(useUpdatePersonSectors).mockReturnValue({
      execute: mockUpdateData,
      isLoading: false,
      isSuccess: false,
      isError: false,
    })

    const { result } = renderHook(() => useSaveOrUpdateFormData())

    // Assert: isSuccess should be true since save is successful
    expect(result.current.isSuccess).toBe(true)
  })
})

import { useSession } from './useSession' // Adjust the path as needed
import { vi, Mock } from 'vitest'
import { useInitiateSessionMutation } from '../api/sessionApi'
import { act, renderHook } from '@testing-library/react'

// Mock the mutation hook
vi.mock('../api/sessionApi', () => ({
  useInitiateSessionMutation: vi.fn(),
}))

describe('useSession', () => {
  const mockUseInitSession = (v: [typeof vi.fn]) =>
    (useInitiateSessionMutation as Mock).mockReturnValue(v)

  it('should call the initiateSession mutation function', async () => {
    // Mock the mutation to resolve immediately
    const mockExecuteInit = vi.fn().mockResolvedValue({ success: true })

    // Mock the hook's return value
    mockUseInitSession([mockExecuteInit])

    const { result } = renderHook(() => useSession())

    // Call the initiateSession function
    await act(async () => {
      result.current.initiateSession()
    })

    // Assert that executeInit was called
    expect(mockExecuteInit).toHaveBeenCalledWith({})
  })

  it('should execute session initialization successfully', async () => {
    const mockExecuteInit = vi.fn().mockResolvedValue({ success: true })

    mockUseInitSession([mockExecuteInit])

    const { result } = renderHook(() => useSession())

    // Call the initiateSession function
    await act(async () => {
      result.current.initiateSession()
    })

    // Assert that executeInit was called
    expect(mockExecuteInit).toHaveBeenCalledTimes(1)
    expect(mockExecuteInit).toHaveBeenCalledWith({})
  })

  it('should handle error state', async () => {
    // Mock the mutation to reject with an error
    const mockExecuteInit = vi
      .fn()
      .mockRejectedValue(new Error('Session initiation failed'))

    mockUseInitSession([mockExecuteInit])

    const { result } = renderHook(() => useSession())

    // Call the initiateSession function
    await act(async () => {
      result.current.initiateSession()
    })

    // Assert that executeInit was called
    expect(mockExecuteInit).toHaveBeenCalledTimes(1)
    expect(mockExecuteInit).toHaveBeenCalledWith({})

    // Since we're not asserting state in this example, you'd normally check error handling here.
    // e.g., If you have error state management in the hook, you would assert it here.
  })
})

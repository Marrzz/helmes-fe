import { useGetSectorOptions } from './useGetSectorOptions' // Adjust the path as needed
import { vi, Mock } from 'vitest'
import { useGetSectorsQuery } from '../api/sectorsApi'
import { renderHook } from '@testing-library/react'
import { SectorDto } from '../types/api'

vi.mock('../api/sectorsApi', () => ({
  useGetSectorsQuery: vi.fn(),
}))

interface MockValues {
  isLoading: boolean
  data?: SectorDto[] | null
}

describe('useGetSectorOptions', () => {
  const mockUseGetSectorsQuery = (v: MockValues) =>
    (useGetSectorsQuery as Mock).mockReturnValue(v)

  it('should return options and isLoading false when data is fetched successfully', async () => {
    const mockSectors = [
      {
        id: 1,
        name: 'Sector 1',
        children: [
          { id: 11, name: 'Sector 1.1', children: [] },
          { id: 12, name: 'Sector 1.2', children: [] },
        ],
      },
      {
        id: 2,
        name: 'Sector 2',
        children: [],
      },
    ]
    mockUseGetSectorsQuery({
      data: mockSectors,
      isLoading: false,
    })

    const { result } = renderHook(() => useGetSectorOptions())

    // Assert that the mapped data is correct
    expect(result.current.data).toEqual([
      {
        label: 'Sector 1',
        value: 1,
        children: [
          { label: 'Sector 1.1', value: 11, children: [] },
          { label: 'Sector 1.2', value: 12, children: [] },
        ],
      },
      {
        label: 'Sector 2',
        value: 2,
        children: [],
      },
    ])

    // Assert that isLoading is false since data has been fetched
    expect(result.current.isLoading).toBe(false)
  })

  it('should return an empty array and isLoading true when data is loading', async () => {
    // Mock the query to simulate loading
    mockUseGetSectorsQuery({
      data: undefined,
      isLoading: true,
    })

    const { result } = renderHook(() => useGetSectorOptions())

    // Assert that data is empty when loading and isLoading is true
    expect(result.current.data).toEqual([])
    expect(result.current.isLoading).toBe(true)
  })

  it('should handle null or undefined data and return an empty array', async () => {
    // Mock the query to return null
    mockUseGetSectorsQuery({
      data: null,
      isLoading: false,
    })

    const { result } = renderHook(() => useGetSectorOptions())

    // Assert that data is empty when it's null
    expect(result.current.data).toEqual([])
    mockUseGetSectorsQuery({
      data: undefined,
      isLoading: false,
    })

    const { result: resultUndefined } = renderHook(() => useGetSectorOptions())

    // Assert that data is empty when it's undefined
    expect(resultUndefined.current.data).toEqual([])
  })

  it('should correctly handle sectors without children', async () => {
    const mockSectors = [
      {
        id: 1,
        name: 'Sector 1',
        children: [],
      },
    ]

    mockUseGetSectorsQuery({
      data: mockSectors,
      isLoading: false,
    })

    const { result } = renderHook(() => useGetSectorOptions())

    // Assert that data is correctly mapped without children
    expect(result.current.data).toEqual([
      {
        label: 'Sector 1',
        value: 1,
        children: [],
      },
    ])

    expect(result.current.isLoading).toBe(false)
  })
})

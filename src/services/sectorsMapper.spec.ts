import { SavePersonSectorsRequest, SectorDto } from '../types/api'
import { SectorOption } from '../types/form'
import { PersonSectorsFields } from '../types/sectors'
import { mapToSaveRequest, mapSectorsToOptions } from './sectorsMapper'

describe('mapToSaveRequest', () => {
  it('should map form values to save request correctly', () => {
    const formValues: PersonSectorsFields = {
      name: 'John Doe',
      agreedToTerms: true,
      sectors: [
        { label: 'Sector 1', value: 1 },
        { label: 'Sector 2', value: 2 },
      ],
    }

    const expectedSaveRequest: SavePersonSectorsRequest = {
      hasAgreedToTerms: true,
      name: 'John Doe',
      selectedSectors: [1, 2],
    }

    const result = mapToSaveRequest(formValues)

    expect(result).toEqual(expectedSaveRequest)
  })

  it('should return an empty array for sectors if none are provided', () => {
    const formValues: PersonSectorsFields = {
      name: 'Jane Doe',
      agreedToTerms: false,
      sectors: [],
    }

    const expectedSaveRequest: SavePersonSectorsRequest = {
      hasAgreedToTerms: false,
      name: 'Jane Doe',
      selectedSectors: [],
    }

    const result = mapToSaveRequest(formValues)

    expect(result).toEqual(expectedSaveRequest)
  })

  it('should map agreedToTerms to hasAgreedToTerms', () => {
    const formValues: PersonSectorsFields = {
      name: 'Jack Smith',
      agreedToTerms: true,
      sectors: [{ label: 'Sector 3', value: 3 }],
    }

    const expectedSaveRequest: SavePersonSectorsRequest = {
      hasAgreedToTerms: true,
      name: 'Jack Smith',
      selectedSectors: [3],
    }

    const result = mapToSaveRequest(formValues)

    expect(result).toEqual(expectedSaveRequest)
  })
})

describe('mapSectorsToOptions', () => {
  it('should map sector DTOs to sector options', () => {
    const sectors: SectorDto[] = [
      { id: 1, name: 'Sector 1', children: [] },
      {
        id: 2,
        name: 'Sector 2',
        children: [{ id: 3, name: 'Sector 2.1', children: [] }],
      },
    ]

    const expectedOptions: SectorOption[] = [
      { label: 'Sector 1', value: 1, children: [] },
      {
        label: 'Sector 2',
        value: 2,
        children: [{ label: 'Sector 2.1', value: 3, children: [] }],
      },
    ]

    const result = mapSectorsToOptions(sectors)

    expect(result).toEqual(expectedOptions)
  })

  it('should return an empty array when no sectors are provided', () => {
    const sectors: SectorDto[] = []

    const expectedOptions: SectorOption[] = []

    const result = mapSectorsToOptions(sectors)

    expect(result).toEqual(expectedOptions)
  })

  it('should handle nested children properly', () => {
    const sectors: SectorDto[] = [
      {
        id: 1,
        name: 'Parent Sector',
        children: [{ id: 2, name: 'Child Sector', children: [] }],
      },
    ]

    const expectedOptions: SectorOption[] = [
      {
        label: 'Parent Sector',
        value: 1,
        children: [{ label: 'Child Sector', value: 2, children: [] }],
      },
    ]

    const result = mapSectorsToOptions(sectors)

    expect(result).toEqual(expectedOptions)
  })
})

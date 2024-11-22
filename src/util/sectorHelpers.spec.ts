import { toggleSelection, searchMatches } from './sectorHelpers' // Replace with actual import
import { SectorOption } from '../types/form' // Replace with actual import

describe('toggleSelection', () => {
  it('should add selected item to the current selection', () => {
    const currentSelection: SectorOption[] = []
    const selectedItem: SectorOption = {
      label: 'Option 1',
      value: 1,
      children: [],
    }

    const result = toggleSelection(currentSelection, selectedItem)

    expect(result).toEqual([{ label: 'Option 1', value: 1 }])
  })

  it('should remove selected item from the current selection if already selected', () => {
    const currentSelection: SectorOption[] = [
      { label: 'Option 1', value: 1, children: [] },
    ]
    const selectedItem: SectorOption = {
      label: 'Option 1',
      value: 1,
      children: [],
    }

    const result = toggleSelection(currentSelection, selectedItem)

    expect(result).toEqual([])
  })

  it('should add children of selected item to the current selection', () => {
    const currentSelection: SectorOption[] = []
    const selectedItem: SectorOption = {
      label: 'Parent Option',
      value: 2,
      children: [
        { label: 'Child Option 1', value: 3, children: [] },
        { label: 'Child Option 2', value: 4, children: [] },
      ],
    }

    const result = toggleSelection(currentSelection, selectedItem)

    expect(result).toEqual([
      { label: 'Parent Option', value: 2 },
      { label: 'Child Option 1', value: 3 },
      { label: 'Child Option 2', value: 4 },
    ])
  })

  it('should remove children of selected item when it is deselected', () => {
    const currentSelection: SectorOption[] = [
      { label: 'Parent Option', value: 2, children: [] },
      { label: 'Child Option 1', value: 3, children: [] },
      { label: 'Child Option 2', value: 4, children: [] },
    ]
    const selectedItem: SectorOption = {
      label: 'Parent Option',
      value: 2,
      children: [
        { label: 'Child Option 1', value: 3, children: [] },
        { label: 'Child Option 2', value: 4, children: [] },
      ],
    }

    const result = toggleSelection(currentSelection, selectedItem)

    expect(result).toEqual([])
  })

  it('should correctly handle nested selections (children of children)', () => {
    const currentSelection: SectorOption[] = []
    const selectedItem: SectorOption = {
      label: 'Parent Option',
      value: 2,
      children: [
        {
          label: 'Child Option 1',
          value: 3,
          children: [{ label: 'Grandchild Option', value: 5, children: [] }],
        },
      ],
    }

    const result = toggleSelection(currentSelection, selectedItem)

    expect(result).toEqual([
      { label: 'Parent Option', value: 2 },
      { label: 'Child Option 1', value: 3 },
      { label: 'Grandchild Option', value: 5 },
    ])
  })
})

describe('searchMatches', () => {
  it('should return true if search term matches the label of the option', () => {
    const option: SectorOption = { label: 'Option 1', value: 1, children: [] }
    const searchTerm = 'Option'

    const result = searchMatches(option, searchTerm)

    expect(result).toBe(true)
  })

  it('should return false if search term does not match the label of the option', () => {
    const option: SectorOption = { label: 'Option 1', value: 1, children: [] }
    const searchTerm = 'Nonexistent'

    const result = searchMatches(option, searchTerm)

    expect(result).toBe(false)
  })

  it('should return true if search term matches any child label', () => {
    const option: SectorOption = {
      label: 'Parent Option',
      value: 1,
      children: [
        { label: 'Child Option', value: 2, children: [] },
        { label: 'Another Child', value: 3, children: [] },
      ],
    }
    const searchTerm = 'Child'

    const result = searchMatches(option, searchTerm)

    expect(result).toBe(true)
  })

  it('should return false if search term does not match any label or child label', () => {
    const option: SectorOption = {
      label: 'Parent Option',
      value: 1,
      children: [{ label: 'Child Option', value: 2, children: [] }],
    }
    const searchTerm = 'Nonexistent'

    const result = searchMatches(option, searchTerm)

    expect(result).toBe(false)
  })

  it('should be case-insensitive when searching for a match', () => {
    const option: SectorOption = { label: 'Option 1', value: 1, children: [] }
    const searchTerm = 'option'

    const result = searchMatches(option, searchTerm)

    expect(result).toBe(true)
  })
})

import { SectorOption, Option } from '../types/form'

export const toggleSelection = (
  currentSelection: SectorOption[],
  selectedItem: SectorOption,
) => {
  const flattenSelection = (item: SectorOption) => {
    const flatList: Option[] = []

    const traverse = (node: SectorOption) => {
      flatList.push({
        label: node.label,
        value: node.value,
      })

      for (const child of node.children) {
        traverse(child)
      }
    }

    traverse(item)
    return flatList
  }

  const selectedFlat = flattenSelection(selectedItem)

  const isAlreadySelected = currentSelection.some(selected =>
    selectedFlat.some(flat => flat.value === selected.value),
  )

  if (isAlreadySelected) {
    return currentSelection.filter(
      item => !selectedFlat.some(flat => flat.value === item.value),
    )
  }

  return [...currentSelection, ...selectedFlat]
}

export const searchMatches = (
  option: SectorOption,
  searchTerm: string,
): boolean => {
  return (
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (option.children &&
      option.children.some(child => searchMatches(child, searchTerm)))
  )
}

import { useGetSectorsQuery } from '../api/sectorsApi'
import { SectorDto } from '../types/api'
import { SectorOption } from '../types/form'

export const useGetSectorOptions = () => {
  const { data, isLoading } = useGetSectorsQuery()

  const mapSectorsToOptions = (sectors: SectorDto[]): SectorOption[] => {
    return sectors.map(sectorToOption)
  }

  const sectorToOption = ({ name, id, children }: SectorDto): SectorOption => {
    return {
      label: name,
      value: id,
      children: children.map(sectorToOption), // Recursively map children
    }
  }

  return {
    data: mapSectorsToOptions(data || []),
    isLoading,
  }
}

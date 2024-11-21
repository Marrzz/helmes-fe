import { SavePersonSectorsRequest, SectorDto } from '../types/api'
import { SectorOption } from '../types/form'
import { PersonSectorsFields } from '../types/sectors'

export const mapToSaveRequest = (
  formValues: PersonSectorsFields,
): SavePersonSectorsRequest => {
  const { sectors, agreedToTerms, name } = formValues
  const sectorIds = sectors.map(({ value }) => value)

  return {
    hasAgreedToTerms: agreedToTerms,
    name: name,
    selectedSectors: sectorIds,
  }
}

export const mapSectorsToOptions = (sectors: SectorDto[]): SectorOption[] => {
  return sectors.map(sectorToOption)
}

const sectorToOption = ({ children, id, name }: SectorDto): SectorOption => {
  return {
    label: name,
    value: id,
    children: children.map(sectorToOption),
  }
}

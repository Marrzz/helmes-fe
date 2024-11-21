export interface SectorDto {
  name: string
  id: number
  children: SectorDto[]
}

export interface PersonSector {
  name: string
  id: number
}

export interface SavePersonSectorsRequest {
  name: string
  hasAgreedToTerms: boolean
  selectedSectors: number[]
}

export interface UpdatePersonSectorsRequest {
  name: string
  hasAgreedToTerms: boolean
  selectedSectors: number[]
}

export interface GetPersonSectorsResponse {
  name?: string
  sectors: PersonSector[]
  hasAgreedToTerms: boolean
}

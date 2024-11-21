import { SectorOption } from '../types/form'
import { ReactComponent } from '../types/react'

interface Props {
  item: SectorOption
  onClick: () => void
}
export const MultiSelectBadge: ReactComponent<Props> = ({ item, onClick }) => {
  return (
    <span
      key={`key-${item.label}`}
      className='flex items-center bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full'
    >
      {item.label}
      <button
        type='button'
        className='ml-1 text-red-500 hover:text-red-700'
        onClick={onClick}
      >
        ✕
      </button>
    </span>
  )
}

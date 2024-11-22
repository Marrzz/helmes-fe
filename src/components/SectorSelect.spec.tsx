import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectorSelect } from './SectorSelect'

describe('SectorSelect', () => {
  it('should render the component', async () => {
    const handleChange = vi.fn()
    const options = [{ children: [], label: 'Hello', value: 1 }]
    render(
      <SectorSelect
        label='Sectors'
        options={options}
        value={[]}
        onChange={handleChange}
      />,
    )

    const labelElement = screen.getByText('Sectors')
    expect(labelElement).toBeInTheDocument()
  })
})

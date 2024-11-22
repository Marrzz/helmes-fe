import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MultiSelectBadge } from './MultiSelectBadge'

describe('MultiSelectBadge', () => {
  it('should render badge', async () => {
    const handleChange = vi.fn()
    const value = { children: [], label: 'Hello', value: 1 }
    render(<MultiSelectBadge item={value} onClick={handleChange} />)

    const element = screen.getByText('Hello')

    expect(element).toBeInTheDocument()
  })
})

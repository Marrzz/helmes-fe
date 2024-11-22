import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './Input'
import { vi } from 'vitest'

describe('Input', () => {
  it('should render without value', async () => {
    render(<Input label={'Test'} value='' onChange={() => null} />)

    const label = screen.getByText('Test')
    const input = screen.getByRole('textbox')

    expect(label).toBeInTheDocument()
    expect(input.getAttribute('value')).toBe('')
  })

  it('should render with value if provided', async () => {
    render(
      <Input
        label={'Test'}
        value='Some interesting text'
        onChange={() => null}
      />,
    )

    const label = screen.getByText('Test')
    const input = screen.getByRole('textbox')

    expect(label).toBeInTheDocument()
    expect(input.getAttribute('value')).toBe('Some interesting text')
  })

  it('should change value if user inserts text', async () => {
    const handleChange = vi.fn()
    render(
      <Input
        label={'Test'}
        value='Some interesting text'
        onChange={handleChange}
      />,
    )

    const label = screen.getByText('Test')
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Hello World' } })

    expect(label).toBeInTheDocument()
    expect(handleChange).toHaveBeenCalledWith('name', 'Hello World', true)
  })
})

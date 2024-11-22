import { render, screen } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('should render checkbox without checkmark if value is false', async () => {
    render(<Checkbox label={'Test'} value={false} onChange={() => null} />)
    expect(screen.getByText('Test')).toBeInTheDocument()

    const checkedElements = document.querySelectorAll('[aria-checked="true"]')
    expect(checkedElements.length).toBe(0)
  })

  it('should render checkbox with checkmark if value is true', async () => {
    render(<Checkbox label={'Test'} value={true} onChange={() => null} />)
    expect(screen.getByText('Test')).toBeInTheDocument()

    const checkedElements = document.querySelectorAll('[aria-checked="true"]')
    expect(checkedElements.length).toBe(1)
  })
})

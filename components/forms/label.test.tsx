import React from 'react'
import { render, screen } from '@testing-library/react'
import { Label } from './label'

describe('Label', () => {
  it('renders with default className', () => {
    render(<Label>Test Label</Label>)
    const label = screen.getByText('Test Label')
    expect(label).toHaveClass('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70')
  })

  it('applies custom className', () => {
    render(<Label className="custom-class">Custom Label</Label>)
    const label = screen.getByText('Custom Label')
    expect(label).toHaveClass('custom-class')
  })

  // New test
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Ref Label</Label>)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    expect(ref.current?.textContent).toBe('Ref Label')
  })

  // New test for login form
  it('renders correctly in a login form context', () => {
    render(
      <form>
        <Label htmlFor="username">Username</Label>
        <input id="username" type="text" />
        <Label htmlFor="password">Password</Label>
        <input id="password" type="password" />
      </form>
    )

    const usernameLabel = screen.getByText('Username')
    const passwordLabel = screen.getByText('Password')

    expect(usernameLabel).toHaveAttribute('for', 'username')
    expect(passwordLabel).toHaveAttribute('for', 'password')
    expect(usernameLabel).toHaveClass('text-sm font-medium leading-none')
    expect(passwordLabel).toHaveClass('text-sm font-medium leading-none')
  })
})
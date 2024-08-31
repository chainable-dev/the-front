import { render } from '@testing-library/react'
import DashboardPage from './page'

jest.mock('@/app/layouts/AuthenticatedLayout', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>
})

test('DashboardPage renders without crashing', () => {
  render(<DashboardPage />)
})
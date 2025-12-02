import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders the site title', () => {
    render(<Navbar />)
    expect(screen.getByText(/CryptoCoin/i)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Exchange')).toBeInTheDocument()
    expect(screen.getByText('Prices')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders the Get Started button', () => {
    render(<Navbar />)
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('has proper link hrefs', () => {
    render(<Navbar />)
    expect(screen.getByText('Prices').closest('a')).toHaveAttribute('href', '/prices')
    expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/blog')
  })
})
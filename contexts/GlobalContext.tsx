'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Currency = 'USD' | 'PKR'
type Theme = 'light' | 'dark'

interface GlobalContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (price: number | string) => string
  convertPrice: (price: number | string) => number
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

const EXCHANGE_RATES = {
  USD: 1,
  PKR: 280, // 1 USD = 280 PKR (example rate)
}

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Load currency
    const loadCurrency = () => {
      const savedCurrency = localStorage.getItem('currency') as Currency || 'USD'
      setCurrency(savedCurrency)
    }

    // Load theme
    const loadTheme = () => {
      const savedTheme = localStorage.getItem('theme') as Theme || 'light'
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }

    loadCurrency()
    loadTheme()

    // Listen for changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currency') {
        loadCurrency()
      } else if (e.key === 'theme') {
        loadTheme()
      }
    }

    const handleCurrencyChange = () => loadCurrency()
    const handleThemeChange = () => loadTheme()

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('currencyChange', handleCurrencyChange)
    window.addEventListener('themeChange', handleThemeChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('currencyChange', handleCurrencyChange)
      window.removeEventListener('themeChange', handleThemeChange)
    }
  }, [])

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    localStorage.setItem('currency', newCurrency)
    window.dispatchEvent(new Event('currencyChange'))
  }

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    window.dispatchEvent(new Event('themeChange'))
  }

  const convertPrice = (price: number | string): number => {
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price
    if (currency === 'USD') return numPrice
    return numPrice * EXCHANGE_RATES.PKR
  }

  const formatPrice = (price: number | string): string => {
    const convertedPrice = convertPrice(price)
    const symbol = currency === 'USD' ? '$' : 'Rs'
    return `${symbol}${convertedPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    handleSetTheme(newTheme)
  }

  return (
    <GlobalContext.Provider value={{
      currency,
      setCurrency: handleSetCurrency,
      formatPrice,
      convertPrice,
      theme,
      setTheme: handleSetTheme,
      toggleTheme
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobal() {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider')
  }
  return context
}

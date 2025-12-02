'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Currency = 'USD' | 'PKR'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (price: number | string) => string
  convertPrice: (price: number | string) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const EXCHANGE_RATES = {
  USD: 1,
  PKR: 280, // 1 USD = 280 PKR (example rate)
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')

  useEffect(() => {
    const loadCurrency = () => {
      const savedCurrency = localStorage.getItem('currency') as Currency || 'USD'
      setCurrency(savedCurrency)
    }

    loadCurrency()
    window.addEventListener('currencyChange', loadCurrency)
    
    return () => {
      window.removeEventListener('currencyChange', loadCurrency)
    }
  }, [])

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    localStorage.setItem('currency', newCurrency)
    window.dispatchEvent(new Event('currencyChange'))
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

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency: handleSetCurrency,
      formatPrice,
      convertPrice
    }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

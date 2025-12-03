'use client'

import { useEffect } from 'react'
import { useGlobal } from '@/contexts/GlobalContext'

interface ThemeWrapperProps {
  children: React.ReactNode
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useGlobal()

  useEffect(() => {
    // Handle prices page
    const pricesRoot = document.getElementById('prices-page-root')
    if (pricesRoot) {
      pricesRoot.className = `min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`
    }
    
    // Handle coin details page
    const coinDetailsRoot = document.getElementById('coin-details-root')
    if (coinDetailsRoot) {
      coinDetailsRoot.className = `py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`
    }
  }, [theme])

  return <>{children}</>
}

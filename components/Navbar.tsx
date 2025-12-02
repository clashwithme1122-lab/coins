'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, DollarSign, ShoppingCart, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlobal } from '@/contexts/GlobalContext'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const { theme, setTheme, currency, setCurrency } = useGlobal()

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const count = cart.reduce((total: number, item: { quantity?: number }) => total + (item.quantity || 1), 0)
      setCartItemCount(count)
    }

    const loadCurrency = () => {
      const savedCurrency = localStorage.getItem('currency') as 'USD' | 'PKR' || 'USD'
      setCurrency(savedCurrency)
    }

    updateCartCount()
    loadCurrency()
    window.addEventListener('storage', updateCartCount)
    window.addEventListener('currencyChange', loadCurrency)
    
    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('currencyChange', loadCurrency)
    }
  }, [])

  const navigation = [
    { name: 'Coins', href: '/coins' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              Taksila Coins
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors duration-200">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
              <span className="text-sm font-medium">Cart</span>
            </Link>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors duration-200"
              >
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">{currency}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {isCurrencyMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                  >
                    <button 
                      onClick={() => {
                        setCurrency('USD')
                        setIsCurrencyMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      USD ($)
                    </button>
                    <button 
                      onClick={() => {
                        setCurrency('PKR')
                        setIsCurrencyMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      PKR (Rs)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors duration-200"
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* CTA Button */}
            <Link href="/coins" className="crypto-button">
              Browse Coins
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/cart"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cart {cartItemCount > 0 && `(${cartItemCount})`}
                </Link>
                <Link
                  href="/coins"
                  className="block crypto-button text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Browse Coins
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
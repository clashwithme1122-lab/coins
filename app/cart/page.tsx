'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'

interface Coin {
  id: number
  title: string
  price: string
  weight: string
  year: string
  description: string
  frontImage: string
  quantity?: number
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<(Coin & { quantity: number })[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
    calculateTotal(cart)
  }

  const calculateTotal = (items: (Coin & { quantity: number })[]) => {
    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[$,]/g, ''))
      return sum + (price * item.quantity)
    }, 0)
    setTotalPrice(total)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    calculateTotal(updatedCart)
  }

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    calculateTotal(updatedCart)
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.setItem('cart', JSON.stringify([]))
    setTotalPrice(0)
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/coins" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Coins
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                  {cartItems.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </span>
                  )}
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-12 text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some antique coins to get started</p>
                  <Link 
                    href="/coins" 
                    className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Browse Coins
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Coin Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.frontImage}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Coin Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">{item.title}</h3>
                          <p className="text-sm text-gray-500 mb-2">{item.year} • {item.weight}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price and Remove */}
                        <div className="text-right">
                          <div className="text-lg font-semibold text-purple-600">
                            {item.price}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="mt-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {cartItems.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-purple-600">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                {cartItems.length > 0 && (
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
                  >
                    Proceed to Checkout
                  </button>
                )}

                {/* Continue Shopping */}
                <Link
                  href="/coins"
                  className="block w-full text-center text-purple-600 hover:text-purple-700 py-2 text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

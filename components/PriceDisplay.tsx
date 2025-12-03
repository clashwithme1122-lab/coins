'use client'

import { useGlobal } from '@/contexts/GlobalContext'

interface PriceDisplayProps {
  price: number
  className?: string
}

export default function PriceDisplay({ price, className = '' }: PriceDisplayProps) {
  const { formatPrice } = useGlobal()
  
  return <span className={className}>{formatPrice(price)}</span>
}

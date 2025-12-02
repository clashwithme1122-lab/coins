'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

interface PriceChartProps {
  sparkline: number[]
}

export default function PriceChart({ sparkline }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState('7D')

  // Transform sparkline data for chart
  const chartData = sparkline.map((price, index) => ({
    index,
    price,
    time: `T${index}`
  }))

  const minPrice = Math.min(...sparkline)
  const maxPrice = Math.max(...sparkline)

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6e3ec0" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6e3ec0" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="time" 
            hide={true}
          />
          <YAxis 
            domain={[minPrice * 0.95, maxPrice * 1.05]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#6e3ec0" 
            strokeWidth={2}
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
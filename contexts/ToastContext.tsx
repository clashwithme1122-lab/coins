'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Toast, ToastContainer } from '@/components/Toast'

interface ToastContextType {
  showToast: (type: Toast['type'], message: string, duration?: number) => void
  showSuccess: (message: string, duration?: number) => void
  showError: (message: string, duration?: number) => void
  showWarning: (message: string, duration?: number) => void
  showInfo: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (type: Toast['type'], message: string, duration?: number) => {
    const id = Date.now().toString()
    const newToast: Toast = { id, type, message, duration }
    
    setToasts(prev => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const showSuccess = (message: string, duration?: number) => showToast('success', message, duration)
  const showError = (message: string, duration?: number) => showToast('error', message, duration)
  const showWarning = (message: string, duration?: number) => showToast('warning', message, duration)
  const showInfo = (message: string, duration?: number) => showToast('info', message, duration)

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  )
}

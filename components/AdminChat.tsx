'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

interface Message {
  id: string
  text: string
  sender: 'user' | 'admin'
  timestamp: Date
  senderName?: string
}

export default function AdminChat() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      senderName: user.name || user.displayName || 'User'
    }

    // Add message optimistically
    setMessages(prev => [...prev, message])
    setNewMessage('')
    setIsTyping(true)

    try {
      // Send to API
      const response = await fetch('/api/admin-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          userId: user.uid,
          userName: user.name || user.displayName || 'User',
          sender: 'user'
        })
      })

      if (response.ok) {
        // Load updated messages
        loadMessages()
      } else {
        // Fallback to mock response if API fails
        setTimeout(() => {
          const adminResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Thank you for your message. An admin will respond shortly.',
            sender: 'admin',
            timestamp: new Date(),
            senderName: 'Admin'
          }
          setMessages(prev => [...prev, adminResponse])
          setIsTyping(false)
        }, 1500)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback to mock response
      setTimeout(() => {
        const adminResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message. An admin will respond shortly.',
          sender: 'admin',
          timestamp: new Date(),
          senderName: 'Admin'
        }
        setMessages(prev => [...prev, adminResponse])
        setIsTyping(false)
      }, 1500)
    }
  }

  const loadMessages = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/admin-chat?userId=${user.uid}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          const formattedMessages = data.messages.map((msg: any) => ({
            id: msg.id,
            text: msg.message,
            sender: msg.sender,
            timestamp: msg.timestamp?.toDate ? msg.timestamp.toDate() : new Date(msg.timestamp),
            senderName: msg.sender === 'user' ? msg.userName : 'Admin'
          }))
          setMessages(formattedMessages)
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  // Load messages when component opens
  useEffect(() => {
    if (isOpen && user) {
      loadMessages()
    }
  }, [isOpen, user])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!user) return null

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {messages.filter(m => m.sender === 'admin').length}
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-4 z-50 w-96 h-[500px] max-h-[70vh] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Admin Support</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Start a conversation with admin support</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                          {message.senderName} • {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-b-lg">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Send, MessageCircle, User } from 'lucide-react'

interface ChatMessage {
  id: string
  userId: string
  userName: string
  message: string
  sender: 'user' | 'admin'
  timestamp: string
  read: boolean
}

interface ChatSession {
  id: string
  userId: string
  userName: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  status: 'active' | 'inactive'
}

export default function SimpleAdminChat() {
  const [chats, setChats] = useState<ChatSession[]>([])
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)

  // Default admin user
  const adminUser = {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@taksila.com'
  }

  useEffect(() => {
    loadChats()
    const interval = setInterval(() => {
      loadChats()
      if (selectedChat) {
        loadMessages(selectedChat.userId)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [selectedChat])

  const loadChats = async () => {
    try {
      const response = await fetch('/api/admin-chat?adminId=admin')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Group messages by user to create chat sessions
          const userSessions: { [key: string]: ChatSession } = {}
          
          data.messages.forEach((msg: ChatMessage) => {
            if (!userSessions[msg.userId]) {
              userSessions[msg.userId] = {
                id: msg.userId,
                userId: msg.userId,
                userName: msg.userName,
                lastMessage: msg.message,
                lastMessageTime: msg.timestamp,
                unreadCount: msg.sender === 'user' ? 1 : 0,
                status: 'active'
              }
            } else {
              const session = userSessions[msg.userId]
              if (new Date(msg.timestamp) > new Date(session.lastMessageTime)) {
                session.lastMessage = msg.message
                session.lastMessageTime = msg.timestamp
                if (msg.sender === 'user') {
                  session.unreadCount++
                }
              }
            }
          })

          setChats(Object.values(userSessions))
        }
      }
    } catch (error) {
      console.error('Error loading chats:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin-chat?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setMessages(data.messages)
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return

    try {
      const response = await fetch('/api/admin-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          userId: selectedChat.userId,
          userName: selectedChat.userName,
          sender: 'admin',
          adminId: 'admin'
        })
      })

      if (response.ok) {
        setNewMessage('')
        await loadMessages(selectedChat.userId)
        await loadChats()
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{adminUser.name}</h3>
              <p className="text-sm text-gray-500">{adminUser.email}</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Chats</h2>
          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat)
                  loadMessages(chat.userId)
                }}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat?.id === chat.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{chat.userName}</p>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {chats.length === 0 && (
              <p className="text-gray-500 text-center py-8">No chats yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">{selectedChat.userName}</h3>
              <p className="text-sm text-gray-500">Active now</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'admin' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'admin'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p>{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

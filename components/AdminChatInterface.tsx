'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, User, Reply } from 'lucide-react';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  adminId?: string;
  message: string;
  sender: 'user' | 'admin';
  timestamp: any;
  read: boolean;
}

interface Chat {
  id: string;
  userId: string;
  userName: string;
  lastMessage: string;
  lastMessageTime: any;
  unreadCount: number;
  lastSender: 'user' | 'admin';
}

export default function AdminChatInterface() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChats();
    // Set up real-time updates
    const interval = setInterval(() => {
      loadChats();
      if (selectedChat) {
        loadMessages(selectedChat.userId);
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat.userId);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin-chat?adminId=admin');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Group messages by user to create chat list
          const userChats = new Map<string, Chat>();
          
          data.messages.forEach((msg: ChatMessage) => {
            const existingChat = userChats.get(msg.userId);
            if (!existingChat || new Date(msg.timestamp) > new Date(existingChat.lastMessageTime)) {
              userChats.set(msg.userId, {
                id: msg.userId,
                userId: msg.userId,
                userName: msg.userName,
                lastMessage: msg.message,
                lastMessageTime: msg.timestamp,
                unreadCount: msg.sender === 'user' && !msg.read ? (existingChat?.unreadCount || 0) + 1 : (existingChat?.unreadCount || 0),
                lastSender: msg.sender
              });
            }
          });

          setChats(Array.from(userChats.values()));
        }
      }
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin-chat?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessages(data.messages);
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const markMessagesAsRead = async (userId: string) => {
    try {
      // Mark all user messages as read in our mock data
      const response = await fetch('/api/admin-chat', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: 'mark-all-read', read: true })
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || sending) return;

    setSending(true);
    try {
      const response = await fetch('/api/admin-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: newMessage,
          userId: selectedChat.userId,
          userName: selectedChat.userName,
          sender: 'admin',
          adminId: 'admin'
        })
      });

      if (response.ok) {
        setNewMessage('');
        // Reload messages to get the latest
        await loadMessages(selectedChat.userId);
        await loadChats(); // Update chat list
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold">Admin Chat Support</span>
          <span className="ml-auto text-sm bg-white/20 px-2 py-1 rounded">
            {chats.length} conversations
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Conversations</h3>
          </div>
          <div className="overflow-y-auto" style={{ height: 'calc(100% - 60px)' }}>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              </div>
            ) : chats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No conversations yet</p>
                <p className="text-sm mt-1">Wait for users to send messages</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedChat?.id === chat.id ? 'bg-purple-50 border-l-4 border-purple-600' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{chat.userName}</p>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(chat.lastMessageTime)} • {formatTime(chat.lastMessageTime)}
                        </p>
                      </div>
                      {chat.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">{selectedChat.userName}</span>
                  <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">
                    Active
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs ${message.sender === 'admin' ? 'order-2' : 'order-1'}`}>
                      <div className={`px-4 py-2 rounded-lg ${
                        message.sender === 'admin'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-1">
                        {message.sender === 'admin' ? 'Admin' : message.userName} • {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your reply..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={sending}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <Reply className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Select a conversation to start messaging</p>
                <p className="text-sm mt-1">New messages will appear automatically</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

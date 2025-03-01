import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';

const ChatbotUI = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your CivicBridge assistant. How can I help you today?", 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = {
        id: messages.length + 2,
        sender: 'bot'
      };
      
      // Simple response logic based on keywords
      const input = inputValue.toLowerCase();
      if (input.includes('election') || input.includes('vote')) {
        botResponse.text = 'Local elections are scheduled for July 4, 2025. You can check voter registration status on our website.';
      } else if (input.includes('meeting') || input.includes('council')) {
        botResponse.text = 'The next City Council meeting is on March 15, 2025. The Budget Planning Session is on March 20, 2025.';
      } else if (input.includes('policy') || input.includes('waste') || input.includes('tax') || input.includes('park') || input.includes('traffic') || input.includes('solar')) {
        botResponse.text = 'We have several recent policy updates. You can find details in the Recent Policies section on our dashboard.';
      } else if (input.includes('hello') || input.includes('hi')) {
        botResponse.text = 'Hello! How can I assist you with CivicBridge today?';
      } else {
        botResponse.text = "I'm not sure I understand. Could you please rephrase your question about local government services?";
      }
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col z-40 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-600 text-white rounded-t-lg">
        <h3 className="font-medium">CivicBridge Assistant</h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 transition-colors">
          <X size={18} />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-3 max-w-[80%] p-2 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-gray-100 ml-auto rounded-tr-none' 
                : 'bg-gray-100 rounded-tl-none'
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button 
            onClick={handleSendMessage}
            className="p-2 bg-gray-600 text-white rounded-r-lg hover:bg-gray-700 focus:outline-none"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
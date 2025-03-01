import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatbotButton = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 p-4 rounded-full bg-gray-600 text-white shadow-lg hover:bg-gray-700 transition-all z-50 ${
        isOpen ? 'rotate-90' : ''
      }`}
      aria-label="Open chat assistant"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default ChatbotButton;
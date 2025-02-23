import { SendHorizontal } from 'lucide-react';
import { KeyboardEvent, useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            rows={1}
          />
          <button
            onClick={handleSend}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500"
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
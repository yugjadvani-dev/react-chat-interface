import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`py-8 ${message.role === 'assistant' ? 'bg-gray-50' : ''}`}>
      <div className="max-w-3xl mx-auto flex gap-6 px-4">
        <div className="w-8 h-8 flex-shrink-0">
          {message.role === 'assistant' ? (
            <Bot className="w-8 h-8 text-blue-500" />
          ) : (
            <User className="w-8 h-8 text-gray-600" />
          )}
        </div>
        <div className="prose prose-slate max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
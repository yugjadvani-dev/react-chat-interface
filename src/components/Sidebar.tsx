import { MessageSquarePlus, MessagesSquare } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export function Sidebar() {
  const { chats, currentChatId, createNewChat, setCurrentChat } = useChatStore();

  return (
    <div className="w-64 bg-gray-900 h-screen flex flex-col">
      <button
        onClick={createNewChat}
        className="m-2 p-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-white"
      >
        <MessageSquarePlus size={20} />
        New Chat
      </button>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setCurrentChat(chat.id)}
            className={`w-full p-3 text-left hover:bg-gray-800 transition-colors flex items-center gap-2 ${
              chat.id === currentChatId ? 'bg-gray-800' : ''
            }`}
          >
            <MessagesSquare size={20} className="text-gray-400" />
            <span className="text-gray-300 truncate">{chat.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
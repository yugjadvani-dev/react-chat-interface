import { create } from 'zustand';
import { Chat, Message } from '../types';

interface ChatStore {
  chats: Chat[];
  currentChatId: string | null;
  createNewChat: () => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  setCurrentChat: (chatId: string) => void;
  getCurrentChat: () => Chat | undefined;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  currentChatId: null,

  createNewChat: () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
    };

    set((state) => ({
      chats: [newChat, ...state.chats],
      currentChatId: newChat.id,
    }));
  },

  addMessage: (chatId, message) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                ...message,
                id: crypto.randomUUID(),
                timestamp: Date.now(),
              },
            ],
          };
        }
        return chat;
      }),
    }));
  },

  setCurrentChat: (chatId) => {
    set({ currentChatId: chatId });
  },

  getCurrentChat: () => {
    const { chats, currentChatId } = get();
    return chats.find((chat) => chat.id === currentChatId);
  },
}));
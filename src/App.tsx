import { useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { Sidebar } from './components/Sidebar';
import { useChatStore } from './store/chatStore';

// Simulated API response (replace with actual API integration)
const simulateResponse = async (message: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `I received your message: "${message}"\n\nThis is a simulated response that supports **markdown** formatting.`;
};

function App() {
  const { createNewChat, getCurrentChat, addMessage } = useChatStore();

  useEffect(() => {
    // Create initial chat if none exists
    createNewChat();
  }, [createNewChat]);

  const currentChat = getCurrentChat();

  const handleSendMessage = async (content: string) => {
    if (!currentChat) return;

    // Add user message
    addMessage(currentChat.id, {
      content,
      role: 'user',
    });

    // Simulate API response
    const response = await simulateResponse(content);
    
    // Add assistant message
    addMessage(currentChat.id, {
      content: response,
      role: 'assistant',
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {currentChat?.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
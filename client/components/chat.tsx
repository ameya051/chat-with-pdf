"use client";
import React from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Doc, Message } from '@/types';

// Keep the local IMessage interface for backward compatibility if needed
interface IMessage {
  role: 'assistant' | 'user';
  content?: string;
  documents?: Doc[];
}

function Chat() {
  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  console.log({ messages });

  const handleSendChatMessage = async () => {
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    const res = await fetch(`http://localhost:8000/chat?message=${message}`);
    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: data?.message,
        documents: data?.docs,
      },
    ]);
  };

  return (
    <div className="p-4">
      <div>
        {messages.map((message, index) => (
          <pre key={index}>{JSON.stringify(message, null, 2)}</pre>
        ))}
      </div>
      <div className="fixed bottom-4 w-100 flex gap-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <Button onClick={handleSendChatMessage} disabled={!message.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default Chat

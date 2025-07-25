import { ChatInput } from "@/components/chat-input";
import { ChatMessage } from "@/components/chat-message";
import { Card } from "@/components/ui/card";
import { Bot, MessageSquare } from "lucide-react";
import { useRef, useEffect } from "react";
import { Message } from "@/types";

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  uploadedFile: File | null;
  onSendMessage: (content: string) => void;
  streamingMessageId?: string;
}

export function ChatInterface({ messages, isLoading, uploadedFile, onSendMessage, streamingMessageId }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="lg:col-span-2 flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="border-b p-4">
        <h3 className="font-medium text-foreground">Ask questions about your PDF</h3>
        <p className="text-sm text-muted-foreground">
          Get insights and answers from your document
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Start a conversation about your PDF document</p>
            <p className="text-sm mt-1">
              Try asking: "What is this document about?" or "Summarize the key points"
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isStreaming={streamingMessageId === message.id && isLoading}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Chat Input */}
      <div className="border-t p-4">
        <ChatInput
          onSendMessage={onSendMessage}
          disabled={!uploadedFile || isLoading}
        />
      </div>
    </Card>
  );
}

import { useState, useCallback } from 'react';
import { Message, Doc } from '@/types';
import { toast } from 'sonner';

interface StreamingChatOptions {
  onMessageUpdate: (messages: Message[]) => void;
  setIsLoading: (loading: boolean) => void;
  onStreamingMessageIdChange?: (id: string | undefined) => void;
}

export const useStreamingChat = ({ onMessageUpdate, setIsLoading, onStreamingMessageIdChange }: StreamingChatOptions) => {
  const sendStreamingMessage = useCallback(async (content: string, messages: Message[]) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    onMessageUpdate(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/chat?message=${encodeURIComponent(content)}&stream=true`);

      if (!response.ok) {
        throw new Error('Failed to connect to chat service');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to initialize stream reader');
      }

      const decoder = new TextDecoder();
      let aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      // Track the streaming message ID
      onStreamingMessageIdChange?.(aiMessage.id);

      // Add the AI message to the list immediately (empty content)
      let currentMessages = [...updatedMessages, aiMessage];
      onMessageUpdate(currentMessages);

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.type === 'docs') {
                  // Update with documents
                  aiMessage = {
                    ...aiMessage,
                    documents: data.docs as Doc[],
                  };
                  currentMessages = currentMessages.map(msg =>
                    msg.id === aiMessage.id ? aiMessage : msg
                  );
                  onMessageUpdate([...currentMessages]);
                } else if (data.type === 'content') {
                  // Append content
                  aiMessage = {
                    ...aiMessage,
                    content: (aiMessage.content || '') + data.content,
                  };
                  currentMessages = currentMessages.map(msg =>
                    msg.id === aiMessage.id ? aiMessage : msg
                  );
                  onMessageUpdate([...currentMessages]);
                } else if (data.type === 'end') {
                  // Stream ended
                  break;
                } else if (data.type === 'error') {
                  throw new Error(data.error);
                }
              } catch (parseError) {
                console.warn('Failed to parse streaming data:', parseError);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
        onStreamingMessageIdChange?.(undefined);
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Streaming chat error:', error);

      // Remove the empty AI message if there was an error
      onMessageUpdate(updatedMessages);
      onStreamingMessageIdChange?.(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [onMessageUpdate, setIsLoading, onStreamingMessageIdChange]);

  return { sendStreamingMessage };
};

'use client';
import { PDFUpload } from "@/components/pdf-upload";
import { Header } from "@/components/header";
import { ChatInterface } from "@/components/chat-interface";
import { DocumentInfo } from "@/components/document-info";
import { useState } from "react";
import { toast } from "sonner";
import { Message } from "@/types";
import { useStreamingChat } from "@/hooks/useStreamingChat";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | undefined>();

  const { sendStreamingMessage } = useStreamingChat({
    onMessageUpdate: setMessages,
    setIsLoading,
    onStreamingMessageIdChange: setStreamingMessageId,
  });

  const handleFileUpload = async (file: File) => {
    try {
      // Upload file to server
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('http://localhost:8000/upload/pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Only set the uploaded file and clear messages if server upload succeeds
        setUploadedFile(file);
        setMessages([]);
        toast.success('File uploaded successfully');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast.error('Failed to upload file. Please try again.');
      console.error('Upload error:', error);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setMessages([]);
  };

  const handleSendMessage = async (content: string) => {
    if (!uploadedFile) return;
    await sendStreamingMessage(content, messages);
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <PDFUpload
          onFileUpload={handleFileUpload}
          uploadedFile={uploadedFile}
          onRemoveFile={handleRemoveFile}
        />

        {uploadedFile && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DocumentInfo uploadedFile={uploadedFile} />
            <ChatInterface
              messages={messages}
              isLoading={isLoading}
              uploadedFile={uploadedFile}
              onSendMessage={handleSendMessage}
              streamingMessageId={streamingMessageId}
            />
          </div>
        )}
      </main>
    </div>
  );
}

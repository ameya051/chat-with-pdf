import { User, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Message } from "@/types";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === "user";

  // Function to format HTML content and handle special characters
  const formatContent = (content?: string) => {
    if (!content) return '';

    return content
      // Replace HTML entities
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Convert markdown-style formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Handle line breaks
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? "bg-primary" : "bg-muted"
        }`}>
        {isUser ? (
          <User className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Bot className={`h-4 w-4 text-muted-foreground ${isStreaming ? 'animate-pulse' : ''}`} />
        )}
      </div>

      {/* Message content */}
      <Card className={`max-w-[80%] p-3 ${isUser
        ? "bg-primary text-primary-foreground"
        : "bg-card"
        }`}>
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="flex flex-wrap gap-1">
            <div
              className="text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: formatContent(message.content)
              }}
            />
            {isStreaming && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* referenced resources */}
        {message.documents && message.documents.length > 0 && (
          <div className="mt-1 p-2 bg-muted/20 rounded-md border-l-2 border-primary/30">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              📄 Referenced sources:
            </p>
            <div className="space-y-1">
              {message.documents.map((doc, index) => (
                <div key={index} className="text-xs text-muted-foreground/80">
                  <span className="font-medium">
                    Page {doc.metadata?.loc?.pageNumber || 'Unknown'}:
                  </span>
                  <span className="ml-1">
                    {doc.pageContent?.substring(0, 120)}
                    {doc.pageContent && doc.pageContent.length > 120 ? '...' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className={`text-xs mt-2 ${isUser
          ? "text-primary-foreground/70"
          : "text-muted-foreground"
          }`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </Card>
    </div>
  );
}
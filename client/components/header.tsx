import { UserButton } from "@clerk/nextjs";
import { MessageSquare } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-card flex items-center justify-between px-8">
      <div className="container mx-auto py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Chat with PDF</h1>
            <p className="text-muted-foreground">
              Upload a PDF document and ask questions about its content
            </p>
          </div>
        </div>
      </div>
      <UserButton />
    </header>
  );
}

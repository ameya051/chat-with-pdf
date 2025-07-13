import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface DocumentInfoProps {
  uploadedFile: File;
}

export function DocumentInfo({ uploadedFile }: DocumentInfoProps) {
  return (
    <Card className="p-4 h-fit">
      <div className="flex items-center gap-3 mb-3">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-foreground">Document Info</h3>
      </div>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-muted-foreground">Name:</span>
          <p className="font-medium text-foreground truncate">
            {uploadedFile.name}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Size:</span>
          <p className="font-medium text-foreground">
            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Status:</span>
          <p className="font-medium text-green-600">Ready for questions</p>
        </div>
      </div>
    </Card>
  );
}

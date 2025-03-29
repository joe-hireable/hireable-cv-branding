
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUp } from "lucide-react";

interface UploadTabProps {
  onUploadComplete: () => void;
}

const UploadTab: React.FC<UploadTabProps> = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onUploadComplete();
    }, 1500);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="rounded-full p-4 bg-primary/10">
          <FileUp size={40} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Upload a CV</h2>
        <p className="text-center text-muted-foreground mb-4">
          Drag and drop a CV file or click to browse
        </p>
        <div className="border-2 border-dashed rounded-lg p-12 w-full max-w-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
          <input type="file" className="hidden" id="cv-upload" />
          <label htmlFor="cv-upload" className="cursor-pointer text-center">
            <p className="font-medium">Click to browse</p>
            <p className="text-sm text-muted-foreground mt-1">or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-4">Supported formats: PDF, DOCX, DOC</p>
          </label>
        </div>
        <Button className="mt-6" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "Processing..." : "Upload & Process CV"}
        </Button>
      </div>
    </Card>
  );
};

export default UploadTab;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUp, FileText, File } from "lucide-react";

interface UploadTabProps {
  onUploadComplete: () => void;
}

const UploadTab: React.FC<UploadTabProps> = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setUploadedFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onUploadComplete();
    }, 1500);
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) {
      return <FileText size={24} className="text-red-500" />;
    } else if (mimeType.includes('word') || mimeType.includes('doc')) {
      return <FileText size={24} className="text-blue-500" />;
    } else {
      return <File size={24} className="text-gray-500" />;
    }
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
        <div 
          className="border-2 border-dashed rounded-lg p-12 w-full max-w-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input 
            type="file" 
            className="hidden" 
            id="cv-upload" 
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx" 
          />
          <label htmlFor="cv-upload" className="cursor-pointer text-center">
            {!uploadedFile ? (
              <>
                <p className="font-medium">Click to browse</p>
                <p className="text-sm text-muted-foreground mt-1">or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-4">Supported formats: PDF, DOCX, DOC</p>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2 mt-2">
                  {getFileIcon(uploadedFile.type)}
                  <p className="font-medium">{uploadedFile.name}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Click to change file</p>
              </div>
            )}
          </label>
        </div>
        <Button 
          className="mt-6" 
          onClick={handleUpload} 
          disabled={isUploading || !uploadedFile}
        >
          {isUploading ? "Processing..." : uploadedFile ? "Upload & Process CV" : "Select a file"}
        </Button>
      </div>
    </Card>
  );
};

export default UploadTab;

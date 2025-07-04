import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  UploadIcon,
  XIcon,
  FileIcon,
  ImageIcon,
  FileTextIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploadZoneProps {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  onFilesSelected?: (files: File[]) => void;
  className?: string;
  label?: string;
  description?: string;
  fileType?: "image" | "document" | "any";
}

export default function FileUploadZone({
  accept = "*/*",
  multiple = false,
  maxFiles = 5,
  maxSize = 10, // 10MB default
  onFilesSelected,
  className,
  label = "Upload files",
  description = "Drag and drop files here or click to browse",
  fileType = "any",
}: FileUploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const filesArray = Array.from(newFiles);
    const validFiles = filesArray.filter((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        console.error(
          `File ${file.name} is too large. Max size is ${maxSize}MB.`
        );
        return false;
      }
      return true;
    });

    // Limit number of files
    const totalFiles = [...files, ...validFiles];
    const filesToAdd = totalFiles.slice(0, maxFiles);

    setFiles(filesToAdd);

    // Simulate upload progress
    filesToAdd.forEach((file) => {
      if (!uploadProgress[file.name]) {
        simulateUploadProgress(file.name);
      }
    });

    if (onFilesSelected) {
      onFilesSelected(filesToAdd);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    processFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
    const newProgress = { ...uploadProgress };
    delete newProgress[fileName];
    setUploadProgress(newProgress);
  };

  const simulateUploadProgress = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress((prev) => ({ ...prev, [fileName]: progress }));
    }, 200);
  };

  const getFileIcon = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5" />;
    } else if (["pdf", "doc", "docx", "txt"].includes(extension || "")) {
      return <FileTextIcon className="h-5 w-5" />;
    }

    return <FileIcon className="h-5 w-5" />;
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return (
        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center w-16 h-16 rounded-md bg-muted">
        {getFileIcon(file)}
      </div>
    );
  };

  const getIconForFileType = () => {
    switch (fileType) {
      case "image":
        return <ImageIcon className="h-10 w-10 text-muted-foreground" />;

      case "document":
        return <FileTextIcon className="h-10 w-10 text-muted-foreground" />;

      default:
        return <UploadIcon className="h-10 w-10 text-muted-foreground" />;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/20 hover:border-primary/50",
          files.length > 0 && "border-primary/30"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={accept}
          multiple={multiple}
          className="hidden"
        />

        {getIconForFileType()}

        <h3 className="mt-4 text-lg font-medium">{label}</h3>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {description}
        </p>

        <Button variant="secondary" size="sm" className="mt-4">
          Browse files
        </Button>

        {multiple && (
          <p className="mt-2 text-xs text-muted-foreground">
            You can upload up to {maxFiles} files ({maxSize}MB max per file)
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-3 p-3 rounded-md bg-muted/50"
            >
              {getFilePreview(file)}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <Progress
                  value={uploadProgress[file.name] || 0}
                  className="h-1 mt-1"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(file.name);
                }}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client"

import { useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PromptEditorProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  title: string;
  onTitleChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

export function PromptEditor({
  prompt,
  onPromptChange,
  title,
  onTitleChange,
  category,
  onCategoryChange,
}: PromptEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    adjustHeight();
    
    // Add resize observer for containers that might change size
    const resizeObserver = new ResizeObserver(adjustHeight);
    resizeObserver.observe(textarea);

    return () => {
      resizeObserver.disconnect();
    };
  }, [prompt]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Prompt</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Masukkan judul prompt..."
          className="text-xl font-medium"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendahuluan">Pendahuluan</SelectItem>
            <SelectItem value="tinjauan-pustaka">Tinjauan Pustaka</SelectItem>
            <SelectItem value="metodologi">Metodologi</SelectItem>
            <SelectItem value="hasil-dan-pembahasan">Hasil dan Pembahasan</SelectItem>
            <SelectItem value="kesimpulan">Kesimpulan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Start writing your prompt here..."
          className="min-h-[300px] font-mono text-sm resize-none p-4 bg-card border rounded-md"
          data-gramm="false" // Disable Grammarly
        />
      </div>
    </div>
  );
}
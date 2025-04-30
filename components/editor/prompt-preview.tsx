"use client"

import { useState, useEffect } from "react";

interface PromptPreviewProps {
  content: string;
}

export function PromptPreview({ content }: PromptPreviewProps) {
  const [formattedContent, setFormattedContent] = useState("");

  useEffect(() => {
    // Simple Markdown-like formatter
    let formatted = content
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-2 mt-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-2 mt-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mb-2 mt-3">$1</h3>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^\s*\- (.*$)/gm, '<li class="ml-5">$1</li>')
      .replace(/^\s*\d+\. (.*$)/gm, '<li class="ml-5 list-decimal">$1</li>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-2">')
      // Line breaks
      .replace(/\n/g, '<br />');

    // Wrap in paragraph if it doesn't start with a header or list
    if (!formatted.startsWith('<h') && !formatted.startsWith('<li')) {
      formatted = `<p class="mb-2">${formatted}</p>`;
    }

    setFormattedContent(formatted);
  }, [content]);

  return (
    <div 
      className="prose prose-sm dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
}
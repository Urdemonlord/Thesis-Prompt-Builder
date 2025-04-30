"use client"

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Copy,
  Scissors,
  ClipboardPaste,
  Search,
  Replace
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface EditorToolbarProps {
  onSave?: () => void;
  onExport?: () => void;
  onImport?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EditorToolbar({ onSave, onExport, onImport }: EditorToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const insertTextAtCursor = (
    textAreaElement: HTMLTextAreaElement, 
    beforeText: string, 
    afterText: string = ""
  ) => {
    const start = textAreaElement.selectionStart;
    const end = textAreaElement.selectionEnd;
    const selectedText = textAreaElement.value.substring(start, end);
    const beforeSelection = textAreaElement.value.substring(0, start);
    const afterSelection = textAreaElement.value.substring(end);
    
    const newValue = `${beforeSelection}${beforeText}${selectedText}${afterText}${afterSelection}`;
    
    // Dispatch an input event to trigger React's onChange handlers
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    )?.set;
    
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(textAreaElement, newValue);
      textAreaElement.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Set cursor position after the inserted text
      const newCursorPosition = start + beforeText.length + selectedText.length + afterText.length;
      textAreaElement.focus();
      textAreaElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  };

  const applyFormatting = (format: string) => {
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textArea) return;
    
    switch (format) {
      case 'bold':
        insertTextAtCursor(textArea, '**', '**');
        break;
      case 'italic':
        insertTextAtCursor(textArea, '*', '*');
        break;
      case 'h2':
        insertTextAtCursor(textArea, '## ');
        break;
      case 'h3':
        insertTextAtCursor(textArea, '### ');
        break;
      case 'ul':
        insertTextAtCursor(textArea, '- ');
        break;
      case 'ol':
        insertTextAtCursor(textArea, '1. ');
        break;
      default:
        break;
    }
  };

  const handleCopy = () => {
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textArea) return;
    const selectedText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
    navigator.clipboard.writeText(selectedText);
  };

  const handleCut = () => {
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textArea) return;
    const selectedText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
    navigator.clipboard.writeText(selectedText);
    const newValue = textArea.value.substring(0, textArea.selectionStart) + 
                    textArea.value.substring(textArea.selectionEnd);
    textArea.value = newValue;
    textArea.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const handlePaste = async () => {
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textArea) return;
    const clipboardText = await navigator.clipboard.readText();
    insertTextAtCursor(textArea, clipboardText);
  };

  const handleSearch = () => {
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textArea || !searchQuery) return;
    
    const text = textArea.value;
    const index = text.indexOf(searchQuery);
    if (index !== -1) {
      textArea.focus();
      textArea.setSelectionRange(index, index + searchQuery.length);
    }
  };

  const handleReplace = () => {
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textArea || !searchQuery || !replaceQuery) return;
    
    const text = textArea.value;
    const newText = text.replace(new RegExp(searchQuery, 'g'), replaceQuery);
    textArea.value = newText;
    textArea.dispatchEvent(new Event('input', { bubbles: true }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 border rounded-md p-1 bg-background">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => applyFormatting('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => applyFormatting('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => applyFormatting('h2')}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
          <span className="sr-only">Heading 2</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => applyFormatting('h3')}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
          <span className="sr-only">Heading 3</span>
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => applyFormatting('ul')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => applyFormatting('ol')}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleCopy}
          title="Copy"
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy</span>
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleCut}
          title="Cut"
        >
          <Scissors className="h-4 w-4" />
          <span className="sr-only">Cut</span>
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={handlePaste}
          title="Paste"
        >
          <ClipboardPaste className="h-4 w-4" />
          <span className="sr-only">Paste</span>
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setShowSearch(!showSearch)}
          title="Find and Replace"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Find and Replace</span>
        </Button>
      </div>

      {showSearch && (
        <div className="space-y-2 p-2 border rounded-md bg-background">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Cari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" size="sm" onClick={handleSearch}>
              Cari
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Ganti dengan..."
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" size="sm" onClick={handleReplace}>
              Ganti
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
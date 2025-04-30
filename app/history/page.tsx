"use client"

import { useState, useEffect, useCallback, useMemo } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { formatDistanceToNow } from "date-fns";
import { Edit, Trash2, Download } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PromptData {
  id: string;
  title: string;
  prompt: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

type StorageType = Record<string, PromptData>;

export default function HistoryPage() {
  const [storage, setStorage] = useLocalStorage<StorageType>("thesis-prompts", {});
  
  // Gunakan useMemo untuk menghindari re-render yang tidak perlu
  const promptHistory = useMemo(() => {
    if (!storage) return [];
    
    return Object.entries(storage)
      .filter(([key]) => key !== "draft")
      .map(([key, value]) => ({ ...value, key }))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [storage]);

  const handleDelete = useCallback((promptId: string) => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      setStorage((prevStorage: StorageType) => {
        const updatedStorage = { ...prevStorage };
        delete updatedStorage[promptId];
        return updatedStorage;
      });
      toast.success("Prompt deleted successfully");
    }
  }, [setStorage]);

  const handleExport = useCallback((prompt: PromptData) => {
    const dataStr = JSON.stringify(prompt, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${prompt.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, []);

  const handleClearAll = useCallback(() => {
    if (window.confirm("Are you sure you want to delete ALL prompts? This cannot be undone.")) {
      // Keep only the draft
      const draftData = storage?.draft;
      setStorage(draftData ? { draft: draftData } : {});
      toast.success("All prompts deleted successfully");
    }
  }, [storage, setStorage]);

  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto p-4 md:p-8">
        <Card className="border-0 shadow-none mb-6">
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl md:text-3xl">Prompt History</CardTitle>
                <CardDescription>
                  View and manage your saved prompts
                </CardDescription>
              </div>
              
              {promptHistory.length > 0 && (
                <Button variant="destructive" onClick={handleClearAll}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>
        
        {promptHistory.length === 0 ? (
          <Alert>
            <AlertDescription>
              You haven&apos;t saved any prompts yet. Go to the editor to create your first prompt!
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {promptHistory.map((prompt) => (
              <Card key={prompt.key} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{prompt.title}</CardTitle>
                      <CardDescription>
                        Category: {prompt.category.split('-').map((word: string) => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleExport(prompt)}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Export</span>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/editor?id=${prompt.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(prompt.key)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground text-sm mb-2">
                    Last updated {formatDistanceToNow(new Date(prompt.updatedAt), { addSuffix: true })}
                  </div>
                  <div className="bg-muted p-3 rounded-md text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    {prompt.prompt.substring(0, 150)}
                    {prompt.prompt.length > 150 ? '...' : ''}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
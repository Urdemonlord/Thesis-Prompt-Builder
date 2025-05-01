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
import { ExportDialog } from "@/components/editor/export-dialog";

interface StorageType {
  [key: string]: {
    id: string;
    title: string;
    prompt: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    lastEdited?: string;
  };
}

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
    if (window.confirm("Apakah Anda yakin ingin menghapus prompt ini?")) {
      const newStorage = { ...storage };
      delete newStorage[promptId];
      setStorage(newStorage);
      toast.success("Prompt berhasil dihapus");
    }
  }, [storage, setStorage]);

  const handleClearAll = useCallback(() => {
    if (window.confirm("Apakah Anda yakin ingin menghapus SEMUA prompt? Tindakan ini tidak dapat dibatalkan.")) {
      const draftData = storage?.draft;
      setStorage(draftData ? { draft: draftData } : {});
      toast.success("Semua prompt berhasil dihapus");
    }
  }, [storage, setStorage]);

  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto p-4 md:p-8">
        <Card className="border-0 shadow-none mb-6">
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl md:text-3xl">Riwayat Prompt</CardTitle>
                <CardDescription>
                  Kelola prompt yang telah Anda simpan
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
              Anda belum menyimpan prompt apapun. Pergi ke editor untuk membuat prompt pertama Anda!
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
                        Kategori: {prompt.category.split('-').map((word: string) => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExportDialog title={prompt.title} content={prompt.prompt} category={prompt.category} />
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/editor?id=${prompt.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(prompt.key)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Hapus</span>
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
"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Template } from "@/types/template";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PromptConfigPanelProps {
  onInsertTemplate: (template: string) => void;
}

export function PromptConfigPanel({ onInsertTemplate }: PromptConfigPanelProps) {
  const { toast } = useToast();
  const [templates, setTemplates] = useLocalStorage<Template[]>("templates", []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: "",
    content: "",
    category: "pendahuluan"
  });

  const handleInsertTemplate = (template: Template) => {
    onInsertTemplate(template.content);
    toast({
      title: "Template berhasil dimasukkan",
      description: `Template "${template.name}" telah dimasukkan ke editor`,
    });
  };

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast({
        title: "Error",
        description: "Nama dan konten template harus diisi",
        variant: "destructive"
      });
      return;
    }

    if (editingTemplate) {
      setTemplates(prev => prev.map(t => 
        t.id === editingTemplate.id 
          ? { ...t, ...newTemplate, id: t.id } 
          : t
      ));
      toast({
        title: "Template berhasil diupdate",
        description: `Template "${newTemplate.name}" telah diperbarui`,
      });
    } else {
      const template: Template = {
        id: Date.now().toString(),
        name: newTemplate.name!,
        content: newTemplate.content!,
        category: newTemplate.category!
      };
      setTemplates(prev => [...prev, template]);
      toast({
        title: "Template berhasil dibuat",
        description: `Template "${template.name}" telah ditambahkan`,
      });
    }

    setNewTemplate({ name: "", content: "", category: "pendahuluan" });
    setEditingTemplate(null);
    setIsDialogOpen(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    toast({
      title: "Template berhasil dihapus",
      description: "Template telah dihapus dari daftar",
    });
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setNewTemplate({
      name: template.name,
      content: template.content,
      category: template.category
    });
    setIsDialogOpen(true);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Template</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => {
              setEditingTemplate(null);
              setNewTemplate({ name: "", content: "", category: "pendahuluan" });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTemplate ? "Edit Template" : "Tambah Template"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Template</Label>
                <Input
                  id="name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Masukkan nama template"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={newTemplate.category}
                  onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}
                >
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
              <div className="space-y-2">
                <Label htmlFor="content">Konten Template</Label>
                <Textarea
                  id="content"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Masukkan konten template"
                  className="min-h-[200px]"
                />
              </div>
              <Button onClick={handleSaveTemplate} className="w-full">
                {editingTemplate ? "Update Template" : "Simpan Template"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {templates.map((template) => (
          <div key={template.id} className="flex items-center justify-between p-2 border rounded-md">
            <Button
              variant="ghost"
              className="flex-1 justify-start"
              onClick={() => handleInsertTemplate(template)}
            >
              {template.name}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditTemplate(template)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTemplate(template.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
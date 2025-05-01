"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

interface Category {
  value: string;
  label: string;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const [customCategories, setCustomCategories] = useLocalStorage<Category[]>("custom-categories", []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const defaultCategories = [
    { value: "informatika", label: "Informatika" },
    { value: "hukum", label: "Hukum" },
    { value: "ekonomi", label: "Ekonomi" },
    { value: "psikologi", label: "Psikologi" },
    { value: "sastra", label: "Sastra" },
    { value: "geografi", label: "Geografi" },
  ];

  const allCategories = [...defaultCategories, ...customCategories];

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const categoryValue = newCategory.toLowerCase().replace(/\s+/g, "-");
      const newCustomCategory = {
        value: categoryValue,
        label: newCategory,
      };
      setCustomCategories([...customCategories, newCustomCategory]);
      setNewCategory("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pilih kategori" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {allCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kategori Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Nama Kategori</Label>
              <Input
                id="category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Masukkan nama kategori"
              />
            </div>
            <Button onClick={handleAddCategory}>Tambah</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
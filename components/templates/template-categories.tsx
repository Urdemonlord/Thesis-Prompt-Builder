"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  {
    id: "pendahuluan",
    name: "Pendahuluan",
    description: "Template untuk bagian pendahuluan skripsi"
  },
  {
    id: "tinjauan-pustaka",
    name: "Tinjauan Pustaka",
    description: "Template untuk analisis literatur dan studi terkait"
  },
  {
    id: "metodologi",
    name: "Metodologi",
    description: "Template untuk menjelaskan metode penelitian"
  },
  {
    id: "hasil-dan-pembahasan",
    name: "Hasil dan Pembahasan",
    description: "Template untuk menyajikan dan menganalisis hasil penelitian"
  },
  {
    id: "kesimpulan",
    name: "Kesimpulan",
    description: "Template untuk menyimpulkan temuan penelitian"
  }
]

interface TemplateCategoriesProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function TemplateCategories({
  selectedCategory,
  onSelectCategory,
}: TemplateCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          size="sm"
          className={cn(
            "text-sm",
            selectedCategory === category.id && "bg-primary text-primary-foreground"
          )}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}
"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { TemplateCategories } from "@/components/templates/template-categories"
import { TemplateCard } from "@/components/templates/template-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const templates = [
  {
    id: "pendahuluan-1",
    title: "Latar Belakang Masalah",
    description: "Template untuk menulis latar belakang masalah penelitian",
    prompt: `Buatkan latar belakang masalah untuk penelitian dengan topik: [TOPIK PENELITIAN]

Pertimbangkan aspek-aspek berikut:
1. Konteks umum dari masalah yang diteliti
2. Pentingnya masalah tersebut untuk diteliti
3. Dampak yang mungkin timbul jika masalah tidak ditangani
4. Gap penelitian yang ada
5. Tujuan penelitian

Format output:
- Paragraf 1: Konteks umum
- Paragraf 2: Pentingnya masalah
- Paragraf 3: Dampak dan gap penelitian
- Paragraf 4: Tujuan penelitian`,
    category: "pendahuluan"
  },
  {
    id: "pendahuluan-2",
    title: "Rumusan Masalah",
    description: "Template untuk merumuskan masalah penelitian",
    prompt: `Buatkan rumusan masalah untuk penelitian dengan topik: [TOPIK PENELITIAN]

Pertimbangkan aspek-aspek berikut:
1. Masalah utama yang akan diteliti
2. Sub-masalah yang mendukung masalah utama
3. Pertanyaan penelitian yang spesifik dan terukur

Format output:
- Masalah Utama: [1-2 kalimat]
- Sub-masalah:
  1. [Sub-masalah 1]
  2. [Sub-masalah 2]
  3. [Sub-masalah 3]
- Pertanyaan Penelitian:
  1. [Pertanyaan 1]
  2. [Pertanyaan 2]
  3. [Pertanyaan 3]`,
    category: "pendahuluan"
  },
  {
    id: "tinjauan-pustaka-1",
    title: "Kajian Teori",
    description: "Template untuk menulis kajian teori",
    prompt: `Buatkan kajian teori untuk penelitian dengan topik: [TOPIK PENELITIAN]

Pertimbangkan aspek-aspek berikut:
1. Definisi konsep-konsep kunci
2. Teori-teori yang relevan
3. Penelitian terdahulu yang terkait
4. Kerangka pemikiran

Format output:
- Definisi Konsep:
  [Konsep 1]: [Definisi]
  [Konsep 2]: [Definisi]
  
- Teori yang Relevan:
  [Nama Teori]: [Penjelasan]
  
- Penelitian Terdahulu:
  [Penelitian 1]: [Temuan Utama]
  [Penelitian 2]: [Temuan Utama]
  
- Kerangka Pemikiran:
  [Diagram/Paragraf yang menjelaskan hubungan antar konsep]`,
    category: "tinjauan-pustaka"
  },
  {
    id: "metodologi-1",
    title: "Desain Penelitian",
    description: "Template untuk menjelaskan desain penelitian",
    prompt: `Buatkan bagian desain penelitian untuk penelitian dengan topik: [TOPIK PENELITIAN]

Pertimbangkan aspek-aspek berikut:
1. Jenis penelitian
2. Pendekatan penelitian
3. Lokasi dan waktu penelitian
4. Populasi dan sampel
5. Teknik pengumpulan data
6. Teknik analisis data

Format output:
- Jenis Penelitian: [Jenis]
- Pendekatan: [Pendekatan]
- Lokasi & Waktu: [Penjelasan]
- Populasi & Sampel: [Penjelasan]
- Teknik Pengumpulan Data: [Penjelasan]
- Teknik Analisis Data: [Penjelasan]`,
    category: "metodologi"
  },
  {
    id: "hasil-dan-pembahasan-1",
    title: "Analisis Data",
    description: "Template untuk menganalisis data penelitian",
    prompt: `Buatkan analisis data untuk penelitian dengan topik: [TOPIK PENELITIAN]

Pertimbangkan aspek-aspek berikut:
1. Deskripsi data
2. Analisis statistik (jika ada)
3. Interpretasi hasil
4. Pembahasan temuan
5. Implikasi hasil

Format output:
- Deskripsi Data:
  [Tabel/Grafik dan penjelasan]
  
- Analisis:
  [Hasil analisis statistik]
  
- Interpretasi:
  [Penjelasan makna hasil]
  
- Pembahasan:
  [Diskusi temuan]
  
- Implikasi:
  [Dampak temuan]`,
    category: "hasil-dan-pembahasan"
  },
  {
    id: "kesimpulan-1",
    title: "Kesimpulan dan Saran",
    description: "Template untuk menulis kesimpulan dan saran",
    prompt: `Buatkan kesimpulan dan saran untuk penelitian dengan topik: [TOPIK PENELITIAN]

Pertimbangkan aspek-aspek berikut:
1. Kesimpulan utama
2. Kesimpulan spesifik
3. Saran untuk penelitian selanjutnya
4. Saran praktis

Format output:
- Kesimpulan Utama:
  [1-2 paragraf]
  
- Kesimpulan Spesifik:
  1. [Kesimpulan 1]
  2. [Kesimpulan 2]
  3. [Kesimpulan 3]
  
- Saran untuk Penelitian Selanjutnya:
  1. [Saran 1]
  2. [Saran 2]
  
- Saran Praktis:
  1. [Saran 1]
  2. [Saran 2]`,
    category: "kesimpulan"
  }
]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("pendahuluan")
  const router = useRouter()

  const filteredTemplates = templates.filter(
    template => template.category === selectedCategory
  )

  const handleUseTemplate = (prompt: string) => {
    // Store template in localStorage to be loaded in editor
    const templateData = {
      title: "Template Baru",
      prompt,
      category: selectedCategory,
      lastEdited: new Date().toISOString()
    }
    
    localStorage.setItem("thesis-prompt-template", JSON.stringify(templateData))
    router.push("/editor")
  }

  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto p-4 md:p-8">
        <Card className="border-0 shadow-none mb-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl md:text-3xl">Template Prompt</CardTitle>
            <CardContent className="px-0 pb-0">
              <p className="text-muted-foreground">
                Pilih template yang sesuai dengan kebutuhan Anda
              </p>
            </CardContent>
          </CardHeader>
        </Card>

        <div className="space-y-6">
          <TemplateCategories
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUseTemplate={handleUseTemplate}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
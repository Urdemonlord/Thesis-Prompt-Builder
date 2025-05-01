"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { TemplateCard } from "@/components/templates/template-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const majors = [
  { key: "computer-science", name: "Computer Science" },
  { key: "law", name: "Law" },
  { key: "economics", name: "Economics" },
  { key: "psychology", name: "Psychology" },
  { key: "literature", name: "Literature" },
  { key: "geography", name: "Geography" },
];

const thesisTemplates: Record<string, any[]> = {
  "computer-science": [
    {
      id: "cs-judul",
      title: "Judul Skripsi",
      description: "Auto-generator judul skripsi berdasarkan minat dan bidang",
      prompt: `Buatkan 5 judul skripsi untuk bidang [MINAT/BIDANG] di Informatika/Computer Science yang sedang tren dan relevan.`,
    },
    {
      id: "cs-latar-belakang",
      title: "Latar Belakang",
      description: "Template latar belakang skripsi Informatika",
      prompt: `Buatkan latar belakang penelitian untuk topik: [TOPIK] di bidang Informatika.`,
    },
    {
      id: "cs-rumusan-masalah",
      title: "Rumusan Masalah",
      description: "Template rumusan masalah skripsi Informatika",
      prompt: `Buatkan rumusan masalah untuk penelitian topik: [TOPIK] di bidang Informatika.`,
    },
    {
      id: "cs-tujuan",
      title: "Tujuan Penelitian",
      description: "Template tujuan penelitian skripsi Informatika",
      prompt: `Buatkan tujuan penelitian untuk topik: [TOPIK] di bidang Informatika.`,
    },
    {
      id: "cs-tinjauan-pustaka",
      title: "Tinjauan Pustaka",
      description: "Tinjauan pustaka dengan sitasi otomatis",
      prompt: `Buatkan tinjauan pustaka untuk topik: [TOPIK] di bidang Informatika, lengkap dengan sitasi otomatis.`,
    },
    {
      id: "cs-metodologi",
      title: "Metodologi Penelitian",
      description: "Template metodologi penelitian skripsi Informatika",
      prompt: `Buatkan metodologi penelitian untuk topik: [TOPIK] di bidang Informatika.`,
    },
    {
      id: "cs-hasil",
      title: "Hasil & Pembahasan",
      description: "Template hasil dan pembahasan skripsi Informatika",
      prompt: `Buatkan hasil dan pembahasan untuk penelitian topik: [TOPIK] di bidang Informatika.`,
    },
    {
      id: "cs-kesimpulan",
      title: "Kesimpulan & Saran",
      description: "Template kesimpulan dan saran skripsi Informatika",
      prompt: `Buatkan kesimpulan dan saran untuk penelitian topik: [TOPIK] di bidang Informatika.`,
    },
    {
      id: "cs-abstrak",
      title: "Abstrak (Indonesia & English)",
      description: "Template abstrak dalam Bahasa Indonesia dan Inggris",
      prompt: `Buatkan abstrak dalam Bahasa Indonesia dan Bahasa Inggris untuk penelitian topik: [TOPIK] di bidang Informatika.`,
    },
  ],
  "law": [
    {
      id: "law-judul",
      title: "Judul Skripsi",
      description: "Auto-generator judul skripsi berdasarkan minat dan bidang",
      prompt: `Buatkan 5 judul skripsi untuk bidang [MINAT/BIDANG] di Ilmu Hukum yang sedang tren dan relevan.`,
    },
    {
      id: "law-latar-belakang",
      title: "Latar Belakang",
      description: "Template latar belakang skripsi Hukum",
      prompt: `Buatkan latar belakang penelitian untuk topik: [TOPIK] di bidang Hukum.`,
    },
    {
      id: "law-rumusan-masalah",
      title: "Rumusan Masalah",
      description: "Template rumusan masalah skripsi Hukum",
      prompt: `Buatkan rumusan masalah untuk penelitian topik: [TOPIK] di bidang Hukum.`,
    },
    {
      id: "law-tujuan",
      title: "Tujuan Penelitian",
      description: "Template tujuan penelitian skripsi Hukum",
      prompt: `Buatkan tujuan penelitian untuk topik: [TOPIK] di bidang Hukum.`,
    },
    {
      id: "law-tinjauan-pustaka",
      title: "Tinjauan Pustaka",
      description: "Tinjauan pustaka dengan sitasi otomatis",
      prompt: `Buatkan tinjauan pustaka untuk topik: [TOPIK] di bidang Hukum, lengkap dengan sitasi otomatis.`,
    },
    {
      id: "law-metodologi",
      title: "Metodologi Penelitian",
      description: "Template metodologi penelitian skripsi Hukum",
      prompt: `Buatkan metodologi penelitian untuk topik: [TOPIK] di bidang Hukum.`,
    },
    {
      id: "law-hasil",
      title: "Hasil & Pembahasan",
      description: "Template hasil dan pembahasan skripsi Hukum",
      prompt: `Buatkan hasil dan pembahasan untuk penelitian topik: [TOPIK] di bidang Hukum.`,
    },
    {
      id: "law-kesimpulan",
      title: "Kesimpulan & Saran",
      description: "Template kesimpulan dan saran skripsi Hukum",
      prompt: `Buatkan kesimpulan dan saran untuk penelitian topik: [TOPIK] di bidang Hukum.`,
    },
    {
      id: "law-abstrak",
      title: "Abstrak (Indonesia & English)",
      description: "Template abstrak dalam Bahasa Indonesia dan Inggris",
      prompt: `Buatkan abstrak dalam Bahasa Indonesia dan Bahasa Inggris untuk penelitian topik: [TOPIK] di bidang Hukum.`,
    },
  ],
  "economics": [
    {
      id: "eco-judul",
      title: "Judul Skripsi",
      description: "Auto-generator judul skripsi berdasarkan minat dan bidang",
      prompt: `Buatkan 5 judul skripsi untuk bidang [MINAT/BIDANG] di Ekonomi yang sedang tren, relevan, dan memiliki urgensi penelitian.`,
    },
    {
      id: "eco-latar-belakang",
      title: "Latar Belakang",
      description: "Template latar belakang skripsi Ekonomi",
      prompt: `Buatkan latar belakang penelitian untuk topik: [TOPIK] di bidang Ekonomi. Sertakan data statistik, fenomena ekonomi terkini, dan gap penelitian yang ada.`,
    },
    {
      id: "eco-rumusan-masalah",
      title: "Rumusan Masalah",
      description: "Template rumusan masalah skripsi Ekonomi",
      prompt: `Buatkan rumusan masalah yang jelas dan terukur untuk penelitian topik: [TOPIK] di bidang Ekonomi. Sertakan pertanyaan utama dan sub-pertanyaan penelitian.`,
    },
    {
      id: "eco-tujuan",
      title: "Tujuan Penelitian",
      description: "Template tujuan penelitian skripsi Ekonomi",
      prompt: `Jelaskan tujuan penelitian untuk topik: [TOPIK] di bidang Ekonomi, baik tujuan umum maupun khusus.`,
    },
    {
      id: "eco-tinjauan-pustaka",
      title: "Tinjauan Pustaka",
      description: "Tinjauan pustaka dengan sitasi otomatis",
      prompt: `Buatkan tinjauan pustaka untuk topik: [TOPIK] di bidang Ekonomi, lengkap dengan sitasi jurnal terbaru, teori ekonomi relevan, dan hasil penelitian terdahulu.`,
    },
    {
      id: "eco-metodologi",
      title: "Metodologi Penelitian",
      description: "Template metodologi penelitian skripsi Ekonomi",
      prompt: `Jelaskan metodologi penelitian untuk topik: [TOPIK] di bidang Ekonomi. Sertakan jenis penelitian, sumber data, teknik pengumpulan data, dan metode analisis statistik yang digunakan.`,
    },
    {
      id: "eco-hasil",
      title: "Hasil & Pembahasan",
      description: "Template hasil dan pembahasan skripsi Ekonomi",
      prompt: `Buatkan hasil dan pembahasan untuk penelitian topik: [TOPIK] di bidang Ekonomi. Sajikan data hasil penelitian, analisis statistik (jika ada), interpretasi hasil, dan diskusi temuan berdasarkan teori dan penelitian terdahulu.`,
    },
    {
      id: "eco-kesimpulan",
      title: "Kesimpulan & Saran",
      description: "Template kesimpulan dan saran skripsi Ekonomi",
      prompt: `Buatkan kesimpulan utama, kesimpulan spesifik, serta saran praktis dan saran untuk penelitian selanjutnya pada topik: [TOPIK] di bidang Ekonomi.`,
    },
    {
      id: "eco-abstrak",
      title: "Abstrak (Indonesia & English)",
      description: "Template abstrak dalam Bahasa Indonesia dan Inggris",
      prompt: `Buatkan abstrak dalam Bahasa Indonesia dan Bahasa Inggris untuk penelitian topik: [TOPIK] di bidang Ekonomi. Sertakan tujuan, metode, hasil utama, dan kesimpulan.`,
    },
  ],
  "psychology": [
    {
      id: "psy-judul",
      title: "Judul Skripsi",
      description: "Auto-generator judul skripsi berdasarkan minat dan bidang",
      prompt: `Buatkan 5 judul skripsi untuk bidang [MINAT/BIDANG] di Psikologi yang aktual, relevan, dan dapat diteliti secara ilmiah.`,
    },
    {
      id: "psy-latar-belakang",
      title: "Latar Belakang",
      description: "Template latar belakang skripsi Psikologi",
      prompt: `Buatkan latar belakang penelitian untuk topik: [TOPIK] di bidang Psikologi. Sertakan fenomena psikologis, data empiris, dan gap penelitian.`,
    },
    {
      id: "psy-rumusan-masalah",
      title: "Rumusan Masalah",
      description: "Template rumusan masalah skripsi Psikologi",
      prompt: `Buatkan rumusan masalah yang spesifik dan terukur untuk penelitian topik: [TOPIK] di bidang Psikologi. Sertakan pertanyaan utama dan sub-pertanyaan penelitian.`,
    },
    {
      id: "psy-tujuan",
      title: "Tujuan Penelitian",
      description: "Template tujuan penelitian skripsi Psikologi",
      prompt: `Jelaskan tujuan penelitian untuk topik: [TOPIK] di bidang Psikologi, baik tujuan umum maupun khusus.`,
    },
    {
      id: "psy-tinjauan-pustaka",
      title: "Tinjauan Pustaka",
      description: "Tinjauan pustaka dengan sitasi otomatis",
      prompt: `Buatkan tinjauan pustaka untuk topik: [TOPIK] di bidang Psikologi, lengkap dengan sitasi jurnal, teori psikologi, dan penelitian terdahulu.`,
    },
    {
      id: "psy-metodologi",
      title: "Metodologi Penelitian",
      description: "Template metodologi penelitian skripsi Psikologi",
      prompt: `Jelaskan metodologi penelitian untuk topik: [TOPIK] di bidang Psikologi. Sertakan jenis penelitian, teknik pengumpulan data, instrumen, dan metode analisis data.`,
    },
    {
      id: "psy-hasil",
      title: "Hasil & Pembahasan",
      description: "Template hasil dan pembahasan skripsi Psikologi",
      prompt: `Buatkan hasil dan pembahasan untuk penelitian topik: [TOPIK] di bidang Psikologi. Sajikan data hasil penelitian, analisis statistik (jika ada), interpretasi hasil, dan diskusi temuan berdasarkan teori dan penelitian terdahulu.`,
    },
    {
      id: "psy-kesimpulan",
      title: "Kesimpulan & Saran",
      description: "Template kesimpulan dan saran skripsi Psikologi",
      prompt: `Buatkan kesimpulan utama, kesimpulan spesifik, serta saran praktis dan saran untuk penelitian selanjutnya pada topik: [TOPIK] di bidang Psikologi.`,
    },
    {
      id: "psy-abstrak",
      title: "Abstrak (Indonesia & English)",
      description: "Template abstrak dalam Bahasa Indonesia dan Inggris",
      prompt: `Buatkan abstrak dalam Bahasa Indonesia dan Bahasa Inggris untuk penelitian topik: [TOPIK] di bidang Psikologi. Sertakan tujuan, metode, hasil utama, dan kesimpulan.`,
    },
  ],
  "literature": [
    {
      id: "lit-judul",
      title: "Judul Skripsi",
      description: "Auto-generator judul skripsi berdasarkan minat dan bidang",
      prompt: `Buatkan 5 judul skripsi untuk bidang [MINAT/BIDANG] di Sastra/Literature yang orisinal, relevan, dan dapat dianalisis secara kritis.`,
    },
    {
      id: "lit-latar-belakang",
      title: "Latar Belakang",
      description: "Template latar belakang skripsi Sastra",
      prompt: `Buatkan latar belakang penelitian untuk topik: [TOPIK] di bidang Sastra. Sertakan fenomena sastra, perkembangan teori, dan gap penelitian.`,
    },
    {
      id: "lit-rumusan-masalah",
      title: "Rumusan Masalah",
      description: "Template rumusan masalah skripsi Sastra",
      prompt: `Buatkan rumusan masalah yang spesifik dan terukur untuk penelitian topik: [TOPIK] di bidang Sastra. Sertakan pertanyaan utama dan sub-pertanyaan penelitian.`,
    },
    {
      id: "lit-tujuan",
      title: "Tujuan Penelitian",
      description: "Template tujuan penelitian skripsi Sastra",
      prompt: `Jelaskan tujuan penelitian untuk topik: [TOPIK] di bidang Sastra, baik tujuan umum maupun khusus.`,
    },
    {
      id: "lit-tinjauan-pustaka",
      title: "Tinjauan Pustaka",
      description: "Tinjauan pustaka dengan sitasi otomatis",
      prompt: `Buatkan tinjauan pustaka untuk topik: [TOPIK] di bidang Sastra, lengkap dengan sitasi karya sastra, teori sastra, dan penelitian terdahulu.`,
    },
    {
      id: "lit-metodologi",
      title: "Metodologi Penelitian",
      description: "Template metodologi penelitian skripsi Sastra",
      prompt: `Jelaskan metodologi penelitian untuk topik: [TOPIK] di bidang Sastra. Sertakan jenis penelitian, pendekatan analisis, sumber data, dan teknik analisis data.`,
    },
    {
      id: "lit-hasil",
      title: "Hasil & Pembahasan",
      description: "Template hasil dan pembahasan skripsi Sastra",
      prompt: `Buatkan hasil dan pembahasan untuk penelitian topik: [TOPIK] di bidang Sastra. Sajikan analisis karya, interpretasi temuan, dan diskusi berdasarkan teori sastra.`,
    },
    {
      id: "lit-kesimpulan",
      title: "Kesimpulan & Saran",
      description: "Template kesimpulan dan saran skripsi Sastra",
      prompt: `Buatkan kesimpulan utama, kesimpulan spesifik, serta saran praktis dan saran untuk penelitian selanjutnya pada topik: [TOPIK] di bidang Sastra.`,
    },
    {
      id: "lit-abstrak",
      title: "Abstrak (Indonesia & English)",
      description: "Template abstrak dalam Bahasa Indonesia dan Inggris",
      prompt: `Buatkan abstrak dalam Bahasa Indonesia dan Bahasa Inggris untuk penelitian topik: [TOPIK] di bidang Sastra. Sertakan tujuan, metode, hasil utama, dan kesimpulan.`,
    },
  ],
  "geography": [
    {
      id: "geo-judul",
      title: "Judul Skripsi",
      description: "Auto-generator judul skripsi berdasarkan minat dan bidang",
      prompt: `Buatkan 5 judul skripsi untuk bidang [MINAT/BIDANG] di Geografi yang aktual, relevan, dan dapat diteliti secara ilmiah.`,
    },
    {
      id: "geo-latar-belakang",
      title: "Latar Belakang",
      description: "Template latar belakang skripsi Geografi",
      prompt: `Buatkan latar belakang penelitian untuk topik: [TOPIK] di bidang Geografi. Sertakan fenomena geografis, data spasial, dan gap penelitian.`,
    },
    {
      id: "geo-rumusan-masalah",
      title: "Rumusan Masalah",
      description: "Template rumusan masalah skripsi Geografi",
      prompt: `Buatkan rumusan masalah yang spesifik dan terukur untuk penelitian topik: [TOPIK] di bidang Geografi. Sertakan pertanyaan utama dan sub-pertanyaan penelitian.`,
    },
    {
      id: "geo-tujuan",
      title: "Tujuan Penelitian",
      description: "Template tujuan penelitian skripsi Geografi",
      prompt: `Jelaskan tujuan penelitian untuk topik: [TOPIK] di bidang Geografi, baik tujuan umum maupun khusus.`,
    },
    {
      id: "geo-tinjauan-pustaka",
      title: "Tinjauan Pustaka",
      description: "Tinjauan pustaka dengan sitasi otomatis",
      prompt: `Buatkan tinjauan pustaka untuk topik: [TOPIK] di bidang Geografi, lengkap dengan sitasi jurnal, teori geografi, dan penelitian terdahulu.`,
    },
    {
      id: "geo-metodologi",
      title: "Metodologi Penelitian",
      description: "Template metodologi penelitian skripsi Geografi",
      prompt: `Jelaskan metodologi penelitian untuk topik: [TOPIK] di bidang Geografi. Sertakan jenis penelitian, teknik pengumpulan data spasial, instrumen, dan metode analisis data.`,
    },
    {
      id: "geo-hasil",
      title: "Hasil & Pembahasan",
      description: "Template hasil dan pembahasan skripsi Geografi",
      prompt: `Buatkan hasil dan pembahasan untuk penelitian topik: [TOPIK] di bidang Geografi. Sajikan data spasial, peta, analisis, dan diskusi temuan berdasarkan teori geografi.`,
    },
    {
      id: "geo-kesimpulan",
      title: "Kesimpulan & Saran",
      description: "Template kesimpulan dan saran skripsi Geografi",
      prompt: `Buatkan kesimpulan utama, kesimpulan spesifik, serta saran praktis dan saran untuk penelitian selanjutnya pada topik: [TOPIK] di bidang Geografi.`,
    },
    {
      id: "geo-abstrak",
      title: "Abstrak (Indonesia & English)",
      description: "Template abstrak dalam Bahasa Indonesia dan Inggris",
      prompt: `Buatkan abstrak dalam Bahasa Indonesia dan Bahasa Inggris untuk penelitian topik: [TOPIK] di bidang Geografi. Sertakan tujuan, metode, hasil utama, dan kesimpulan.`,
    },
  ],
};

export default function TemplatesPage() {
  const [selectedMajor, setSelectedMajor] = useState("computer-science");
  const router = useRouter();

  const handleUseTemplate = (prompt: string) => {
    const templateData = {
      title: "Template Baru",
      prompt,
      category: selectedMajor,
      lastEdited: new Date().toISOString(),
    };
    localStorage.setItem("thesis-prompt-template", JSON.stringify(templateData));
    router.push("/editor");
  };

  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto p-4 md:p-8">
        <Card className="border-0 shadow-none mb-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl md:text-3xl">Template Skripsi Spesifik Jurusan</CardTitle>
            <CardContent className="px-0 pb-0">
              <p className="text-muted-foreground">
                Pilih jurusan dan template skripsi yang sesuai kebutuhan Anda
              </p>
            </CardContent>
          </CardHeader>
        </Card>

        <div className="flex gap-2 mb-4">
          {majors.map((major) => (
            <button
              key={major.key}
              className={`px-4 py-2 rounded ${selectedMajor === major.key ? "bg-primary text-white" : "bg-muted"}`}
              onClick={() => setSelectedMajor(major.key)}
            >
              {major.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(thesisTemplates[selectedMajor] || []).map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUseTemplate={handleUseTemplate}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
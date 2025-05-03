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
      prompt: `Identifikasikan dan buatkan 5 judul skripsi yang inovatif, aplikatif, dan relevan dengan tren terkini dalam bidang [MINAT/BIDANG] di ranah Informatika/Ilmu Komputer.

Untuk setiap judul:

Sertakan deskripsi singkat (2–3 kalimat) mengenai ruang lingkup penelitian.

Jelaskan alasan pemilihan topik tersebut, mencakup urgensi, relevansi dengan perkembangan teknologi saat ini, serta potensi kontribusi terhadap dunia akademik maupun industri.

Soroti novelty (kebaruan), potensi tantangan riset, dan pendekatan/metode yang mungkin digunakan.

Gunakan bahasa formal, akademik, dan presisi terminologi teknis.`,
    },
    {
      id: "cs-latar-belakang",
      title: "Latar Belakang",
      description: "Template latar belakang skripsi Informatika",
      prompt: `Buatkan latar belakang penelitian yang argumentatif dan terstruktur untuk topik: [TOPIK] di bidang Informatika, berdasarkan literatur atau jurnal ilmiah berikut:

[MASUKKAN DAFTAR JURNAL ATAU RINGKASANNYA DI SINI]

Tulis dengan pendekatan sebagai berikut:

Jelaskan fenomena atau isu yang menjadi dasar pemilihan topik

Ulas secara ringkas temuan dan pendekatan dari literatur yang telah dibaca

Identifikasi gap riset atau keterbatasan dari studi-studi tersebut

Tunjukkan bagaimana penelitian ini akan menjawab gap tersebut atau memberikan pendekatan baru

Gunakan gaya akademik, padat, dan berbasis analisis — bukan sekadar deskriptif.`,
    },
    {
      id: "cs-rumusan-masalah",
      title: "Rumusan Masalah",
      description: "Template rumusan masalah skripsi Informatika",
      prompt: `Berdasarkan literatur atau jurnal yang telah dikumpulkan, buatkan rumusan masalah penelitian untuk topik: [TOPIK] di bidang Informatika. Rumusan masalah harus menunjukkan gap penelitian yang ditemukan dari studi sebelumnya, dengan satu pertanyaan utama yang kuat dan beberapa sub-pertanyaan yang mendetail. Gunakan pendekatan kritis terhadap literatur yang ada dan pastikan bahwa rumusan masalah tersebut dapat dijawab secara ilmiah melalui metode penelitian yang tepat.`,
    },
    {
      id: "cs-tujuan",
      title: "Tujuan Penelitian",
      description: "Template tujuan penelitian skripsi Informatika",
      prompt: `Berdasarkan rumusan masalah dan kajian literatur yang telah dilakukan, buatkan tujuan penelitian untuk topik: [TOPIK] di bidang Informatika. Tuliskan satu tujuan umum yang mencerminkan kontribusi utama dari penelitian ini terhadap perkembangan ilmu pengetahuan atau aplikasi di bidang tersebut. Lalu uraikan 2–4 tujuan khusus yang bersifat operasional, spesifik, terukur, dan relevan dengan metode yang akan digunakan. Pastikan tujuan tersebut menjawab pertanyaan penelitian secara sistematis dan menunjukkan arah capaian riset secara ilmiah.`,
    },
    {
      id: "cs-tinjauan-pustaka",
      title: "Tinjauan Pustaka",
      description: "Tinjauan pustaka dengan sitasi otomatis",
      prompt: `Buatkan tinjauan pustaka untuk topik: [TOPIK] di bidang Informatika berdasarkan literatur ilmiah yang relevan dan terkini (maksimal 5 tahun terakhir). Sajikan ringkasan dari teori-teori utama, pendekatan yang telah digunakan dalam studi sebelumnya, serta celah penelitian (research gap) yang masih bisa dieksplorasi. Hubungkan setiap studi dengan topik penelitian yang diangkat, tunjukkan keterkaitan antarreferensi, dan soroti perbedaan pendekatan atau temuan. Tambahkan sitasi otomatis dalam format APA (nama, tahun), dan pastikan narasi bersifat kritis, bukan sekadar rangkuman.`,
    },
    {
      id: "cs-metodologi",
      title: "Metodologi Penelitian",
      description: "Template metodologi penelitian skripsi Informatika",
      prompt: `Buatkan metodologi penelitian secara lengkap dan sistematis untuk topik: [TOPIK] di bidang Informatika. Jelaskan pendekatan penelitian yang digunakan (kualitatif, kuantitatif, atau mixed-method), desain penelitian, metode pengumpulan data (misalnya survei, wawancara, observasi, atau pengujian sistem), populasi dan sampel (jika relevan), teknik analisis data (statistik, machine learning, thematic analysis, dll.), serta tools atau software yang digunakan dalam proses pengolahan data atau implementasi sistem. Paparkan juga justifikasi pemilihan metode dan bagaimana metodologi ini sesuai untuk menjawab rumusan masalah serta mencapai tujuan penelitian.`,
    },
    {
      id: "cs-hasil",
      title: "Hasil & Pembahasan",
      description: "Template hasil dan pembahasan skripsi Informatika",
      prompt: `Buatkan bagian hasil dan pembahasan secara mendalam untuk penelitian dengan topik: [TOPIK] di bidang Informatika. Sajikan temuan utama penelitian yang diperoleh dari data yang telah dikumpulkan dan analisis yang dilakukan. Bahas hasil yang ditemukan, baik yang mendukung maupun yang bertentangan dengan hipotesis atau teori sebelumnya. Jelaskan relevansi temuan ini dalam konteks penelitian sebelumnya dan apa implikasi praktis dari hasil penelitian ini untuk industri atau akademia. Analisis perbedaan antara hasil yang diharapkan dan yang ditemukan, serta faktor-faktor yang memengaruhi temuan tersebut. Sertakan interpretasi mendalam mengenai hasil dan bagaimana temuan tersebut dapat diintegrasikan ke dalam literatur yang ada.`,
    },
    {
      id: "cs-kesimpulan",
      title: "Kesimpulan & Saran",
      description: "Template kesimpulan dan saran skripsi Informatika",
      prompt: `Buatkan kesimpulan dan saran secara komprehensif untuk penelitian dengan topik: [TOPIK] di bidang Informatika. Ringkas temuan utama yang diperoleh dari hasil penelitian, jelaskan kontribusi yang telah diberikan oleh penelitian ini terhadap pengembangan ilmu pengetahuan di bidang Informatika, serta relevansinya terhadap tren dan perkembangan teknologi saat ini. Diskusikan keterbatasan penelitian ini, baik dari segi metodologi, ruang lingkup, ataupun variabel yang belum dijangkau. Berdasarkan hasil temuan, buatkan saran untuk pengembangan penelitian lebih lanjut, baik untuk memperdalam kajian yang sudah ada ataupun mengeksplorasi topik baru yang muncul dari penelitian ini. Selain itu, beri rekomendasi praktis untuk industri atau pihak terkait yang dapat memanfaatkan hasil penelitian ini dalam aplikasi nyata.`,
    },
    {
      id: "cs-abstrak",
      title: "Abstrak (Indonesia & English)",
      description: "Template abstrak dalam Bahasa Indonesia dan Inggris",
      prompt: `Buatkan abstrak dalam Bahasa Indonesia dan Bahasa Inggris untuk penelitian dengan topik: [TOPIK] di bidang Informatika.

Bahasa Indonesia:
Tulis abstrak yang mencakup latar belakang singkat mengenai topik yang diteliti, tujuan penelitian yang ingin dicapai, metodologi yang digunakan (termasuk jenis penelitian, metode pengumpulan data, dan teknik analisis data), hasil utama yang ditemukan selama penelitian, serta kesimpulan dan kontribusi penelitian terhadap pengembangan ilmu Informatika. Sebutkan pula relevansi penelitian dengan perkembangan teknologi saat ini dan potensi aplikasi praktis dari hasil penelitian.`,
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

  const handleUseTemplate = (prompt: string, category: string) => {
    const templateData = {
      title: "Template Baru",
      prompt,
      category,
      major: selectedMajor,
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
              onUseTemplate={() => handleUseTemplate(template.prompt, template.id.split('-')[1])}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
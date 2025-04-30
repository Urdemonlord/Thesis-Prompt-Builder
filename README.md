# Aplikasi Editor Prompt

Aplikasi ini adalah editor teks khusus untuk membuat dan mengelola prompt AI. Dibangun dengan Next.js dan TypeScript, aplikasi ini menyediakan berbagai fitur untuk membantu Anda membuat prompt yang efektif.

## Fitur Utama

- **Editor Teks Canggih**: Mendukung format Markdown dan berbagai alat pengeditan
- **Template Prompt**: Simpan dan gunakan kembali template prompt
- **AI Helper**: Dapatkan saran dari AI untuk meningkatkan prompt Anda
- **Preview Real-time**: Lihat hasil prompt Anda secara langsung
- **Manajemen File**: Simpan, ekspor, dan impor prompt Anda

## Persyaratan Sistem

- Node.js 18.0.0 atau lebih baru
- npm atau yarn
- API Key Gemini (untuk fitur AI Helper)

## Instalasi

1. Clone repositori ini:
```bash
git clone [URL_REPOSITORI]
cd [NAMA_FOLDER]
```

2. Install dependensi:
```bash
npm install
# atau
yarn install
```

3. Jalankan aplikasi:
```bash
npm run dev
# atau
yarn dev
```

## Cara Penggunaan

### Membuat Prompt Baru

1. Buka aplikasi di browser Anda
2. Klik tombol "Prompt Baru" di sidebar
3. Masukkan judul dan konten prompt Anda
4. Gunakan toolbar untuk memformat teks
5. Klik "Simpan" untuk menyimpan prompt

### Menggunakan Template

1. Buka panel "Template" di sidebar
2. Pilih template yang ingin Anda gunakan
3. Klik "Gunakan" untuk memasukkan template ke editor
4. Edit template sesuai kebutuhan Anda

### Menggunakan AI Helper

1. Pastikan Anda telah menambahkan API Key Gemini di pengaturan
2. Buka panel "AI Helper" di sidebar
3. Masukkan pertanyaan atau konteks tentang prompt Anda
4. Klik "Dapatkan Saran" untuk mendapatkan masukan dari AI
5. Gunakan saran yang diberikan untuk meningkatkan prompt Anda

### Mengelola Prompt

- **Menyimpan**: Prompt secara otomatis disimpan sebagai draft
- **Ekspor**: Klik tombol "Ekspor" untuk menyimpan prompt ke file JSON
- **Import**: Klik tombol "Import" untuk memuat prompt dari file JSON
- **Riwayat**: Lihat dan kelola prompt yang pernah Anda buat di halaman "Riwayat"

## Struktur Folder

```
├── app/                 # Halaman aplikasi
├── components/          # Komponen UI
├── hooks/              # Custom hooks
├── lib/                # Utilitas dan konfigurasi
├── public/             # File statis
└── types/              # Definisi tipe TypeScript
```

## Kontribusi

Kontribusi selalu diterima! Silakan buat issue atau pull request untuk saran dan perbaikan.

## Lisensi

MIT
# Bloom — Suite Produktivitas Lokal

Bloom adalah aplikasi produktivitas mungil yang berjalan sepenuhnya di perangkat Anda. Tiga fitur utamanya: catatan tempel warna-warni, brankas kata sandi yang dienkripsi, dan enkripsi teks luring. Tidak ada akun, tidak ada server, tidak ada awan — semua data Anda tetap berada di perangkat Anda.

## Instalasi Cepat (Windows)

Cara paling mudah menggunakan Bloom adalah mengunduh installer `.exe` langsung:

1. Buka halaman [**Releases**](https://github.com/sindufha/bloom-notes/releases) di repositori ini.
2. Unduh berkas **Bloom Notes Setup x.x.x.exe** dari rilis terbaru.
3. Jalankan installer — aplikasi akan langsung terpasang dan siap digunakan.
4. Tidak perlu memasang Node.js, tidak perlu terminal. Cukup klik dua kali dan pakai.

> **Catatan:** Karena installer belum ditandatangani secara digital, Windows SmartScreen mungkin menampilkan peringatan. Klik **More info** → **Run anyway** untuk melanjutkan.

## Fitur

- **Catatan Tempel** — buat, sunting, dan hapus catatan dengan enam pilihan warna pastel. Cocok untuk ide singkat, daftar belanja, atau pengingat harian.
- **Brankas Kata Sandi** — simpan kredensial situs dan layanan Anda, dienkripsi memakai AES-256-GCM dengan kata sandi utama buatan Anda. Dilengkapi label akun (Instagram, Gmail, Facebook, X, LinkedIn, GitHub, Discord, Telegram, WhatsApp, dan banyak lagi) sehingga Anda tahu setiap entri tanpa perlu mengetik ulang.
- **Enkripsi Teks** — enkripsi dan dekripsi pesan rahasia secara luring memakai AES-256-GCM. Kunci diturunkan via PBKDF2-SHA256 dengan 600.000 iterasi, ditambah salt acak 16 byte per pesan, sehingga ciphertext praktis tidak bisa dipecahkan dalam ratusan tahun ke depan.
- **Aplikasi Desktop** — tersedia sebagai installer `.exe` untuk Windows. Jalankan tanpa peramban, tanpa koneksi internet.
- **PWA (Progressive Web App)** — bisa juga dipasang sebagai aplikasi lewat peramban di desktop maupun ponsel.
- **Tanpa pelacakan** — tidak ada analitik, tidak ada panggilan jaringan ke luar. Semua data tersimpan di `localStorage` perangkat Anda.

## Tumpukan Teknologi

- [Vite](https://vitejs.dev/) sebagai bundler dan dev server
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) untuk gaya tampilan kartunis
- [React Router](https://reactrouter.com/) untuk navigasi antar halaman
- [Lucide React](https://lucide.dev/) untuk ikon
- [Electron](https://www.electronjs.org/) untuk membungkus aplikasi sebagai program desktop
- Web Crypto API (`AES-256-GCM` + `PBKDF2-SHA256`) untuk enkripsi brankas dan teks

## Instalasi Manual (untuk Pengembang)

Jika Anda ingin menjalankan dari kode sumber atau melakukan pengembangan:

### Persiapan

Pastikan komputer Anda sudah terpasang:

- [Node.js](https://nodejs.org/) versi 18 ke atas
- npm (sudah disertakan bersama Node.js) atau pengelola paket lain seperti pnpm/yarn

Cek versinya dengan:

```bash
node --version
npm --version
```

### Cara Menjalankan Secara Lokal

1. Klon repositori:

   ```bash
   git clone https://github.com/sindufha/bloom-notes.git
   cd bloom-notes
   ```

2. Pasang semua dependensi:

   ```bash
   npm install
   ```

3. Salin berkas lingkungan, lalu sesuaikan isinya:

   ```bash
   cp .env.example .env
   ```

   Lalu buka `.env` dan ganti `VITE_VAULT_SALT` dengan string heksadesimal acak. Buat satu dengan perintah:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   Tempelkan hasilnya ke baris `VITE_VAULT_SALT=`.

4. Jalankan server pengembangan (mode peramban):

   ```bash
   npm run dev
   ```

5. Buka peramban dan kunjungi [http://localhost:5173](http://localhost:5173).

### Membangun Installer Sendiri

Untuk membangun installer `.exe` dari kode sumber:

```bash
npm run electron:build
```

Hasil installer akan ada di folder `release/`. Anda juga bisa membangun untuk platform lain:

```bash
npm run electron:build:linux   # AppImage untuk Linux
npm run electron:build:mac     # DMG untuk macOS
```

## Membangun untuk Produksi (Web)

```bash
npm run build
```

Hasil build akan diletakkan di folder `dist/`. Untuk mencobanya secara lokal sebelum disebarkan:

```bash
npm run preview
```

## Cara Memakai

### Catatan Tempel

1. Buka tab **Catatan** di bagian navigasi.
2. Tekan tombol **Catatan baru** untuk membuka formulir.
3. Isi judul dan isi catatan, pilih warna, lalu tekan **Tambah catatan**.
4. Catatan yang sudah ada bisa disunting atau dihapus lewat ikon pensil dan tempat sampah pada setiap kartu.

### Brankas Kata Sandi

1. Buka tab **Brankas**.
2. Pertama kali memakai brankas, buat kata sandi utama. Kata sandi ini yang akan dipakai untuk mengenkripsi dan membuka isi brankas.
3. Setelah brankas terbuka, tekan **Tambah** untuk menyimpan kredensial baru.
4. Pilih **Label akun** dari daftar (Instagram, Gmail, Facebook, X, LinkedIn, GitHub, Discord, Telegram, WhatsApp, Shopee, Tokopedia, dan lain-lain) agar Anda tahu jenis akun pada setiap entri tanpa perlu mengetik ulang.
5. Isi nama situs, nama pengguna, kata sandi (atau tekan **Acak** untuk kata sandi acak), dan catatan opsional.
6. Tekan ikon mata untuk menampilkan kata sandi, atau ikon salin untuk menyalinnya ke papan klip.
7. Tekan **Kunci** kapan saja untuk mengunci ulang brankas. Begitu terkunci, Anda wajib memasukkan kata sandi utama lagi untuk membuka.

### Enkripsi Teks

1. Buka tab **Enkripsi**.
2. Pilih mode **Enkripsi** atau **Dekripsi**.
3. Tempel atau ketik teks pada kolom masukan.
4. Masukkan kunci rahasia. Untuk mode enkripsi, Anda bisa menekan **Acak kunci** agar sistem membuatkan kunci acak yang kuat.
5. Tekan **Enkripsi sekarang** atau **Dekripsi sekarang**.
6. Salin hasilnya dengan tombol **Salin**. Simpan kunci di tempat aman — tanpa kunci yang tepat, ciphertext tidak bisa dibuka kembali.

Setiap ciphertext diawali dengan penanda `BLOOMv1:` dan berisi salt acak unik, jadi mengenkripsi teks yang sama dengan kunci yang sama akan menghasilkan ciphertext yang berbeda setiap kali.

### Pasang sebagai Aplikasi (PWA)

Saat peramban Anda mendeteksi situs ini sebagai PWA, tombol **Pasang aplikasi** akan muncul di navigasi. Tekan tombol itu untuk memasang Bloom sebagai aplikasi terpisah di desktop maupun ponsel Anda.

## Struktur Proyek

```
Bloom-Notes/
├── electron/            proses utama Electron untuk aplikasi desktop
├── public/              ikon dan service worker untuk PWA
├── src/
│   ├── hooks/           hook React (useLocalStorage, usePwaInstall)
│   ├── lib/             utilitas enkripsi (crypto.ts) dan helper
│   ├── pages/           Home, StickyNotes, PasswordVault, TextEncryption
│   ├── App.tsx          navigasi dan routing
│   └── main.tsx         entry point aplikasi
├── index.html
├── tailwind.config.js
└── vite.config.ts
```

## Catatan Keamanan

- Kata sandi utama brankas dan kunci enkripsi teks tidak pernah disimpan di mana pun. Jika lupa, datanya **tidak bisa dipulihkan**. Pastikan Anda mengingatnya atau menyimpannya di tempat yang aman.
- Enkripsi dilakukan langsung di peramban (atau di Electron) memakai Web Crypto API. Setiap entri brankas dan setiap teks terenkripsi menggunakan IV (initialization vector) acak 12 byte.
- `PBKDF2-SHA256` dengan 600.000 iterasi dipakai untuk menurunkan kunci, sehingga serangan brute force menjadi sangat mahal.
- Untuk fitur enkripsi teks, setiap pesan juga menggunakan salt acak 16 byte sehingga kombinasi salt + IV menjamin keunikan tiap ciphertext.
- Karena semua data tersimpan lokal, jika Anda menghapus data peramban (atau data aplikasi desktop), data Bloom juga akan ikut hilang. Lakukan pencadangan secara manual bila perlu.

## Skrip yang Tersedia

- `npm run dev` — menjalankan server pengembangan dengan hot reload
- `npm run build` — membangun versi produksi ke folder `dist/`
- `npm run preview` — menyajikan hasil build untuk pemeriksaan
- `npm run lint` — menjalankan ESLint pada seluruh kode TypeScript
- `npm run electron:dev` — menjalankan aplikasi dalam mode Electron
- `npm run electron:build` — membangun installer `.exe` untuk Windows
- `npm run electron:build:linux` — membangun AppImage untuk Linux
- `npm run electron:build:mac` — membangun DMG untuk macOS

## Lisensi

Proyek ini dirilis sebagai pribadi untuk keperluan pengguna sendiri. Silakan modifikasi sesuai kebutuhan.

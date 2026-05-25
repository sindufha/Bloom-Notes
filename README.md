# Bloom — Suite Produktivitas Lokal

Bloom adalah aplikasi produktivitas mungil yang berjalan sepenuhnya di peramban Anda. Tiga fitur utamanya: catatan tempel warna-warni, brankas kata sandi yang dienkripsi, dan enkripsi teks luring. Tidak ada akun, tidak ada server, tidak ada awan — semua data Anda tetap berada di perangkat Anda.

## Fitur

- **Catatan Tempel** — buat, sunting, dan hapus catatan dengan enam pilihan warna pastel. Cocok untuk ide singkat, daftar belanja, atau pengingat harian.
- **Brankas Kata Sandi** — simpan kredensial situs dan layanan Anda, dienkripsi memakai AES-256-GCM dengan kata sandi utama buatan Anda. Dilengkapi label akun (Instagram, Gmail, Facebook, X, LinkedIn, GitHub, Discord, Telegram, WhatsApp, dan banyak lagi) sehingga Anda tahu setiap entri tanpa perlu mengetik ulang.
- **Enkripsi Teks** — enkripsi dan dekripsi pesan rahasia secara luring memakai AES-256-GCM. Kunci diturunkan via PBKDF2-SHA256 dengan 600.000 iterasi, ditambah salt acak 16 byte per pesan, sehingga ciphertext praktis tidak bisa dipecahkan dalam ratusan tahun ke depan.
- **PWA (Progressive Web App)** — bisa dipasang sebagai aplikasi di desktop maupun ponsel, dan tetap berjalan ketika koneksi internet tidak tersedia.
- **Tanpa pelacakan** — tidak ada analitik, tidak ada panggilan jaringan ke luar. Semua data tersimpan di `localStorage` peramban.

## Tumpukan Teknologi

- [Vite](https://vitejs.dev/) sebagai bundler dan dev server
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) untuk gaya tampilan kartunis
- [React Router](https://reactrouter.com/) untuk navigasi antar halaman
- [Lucide React](https://lucide.dev/) untuk ikon
- Web Crypto API (`AES-256-GCM` + `PBKDF2-SHA256`) untuk enkripsi brankas dan teks

## Persiapan

Pastikan komputer Anda sudah terpasang:

- [Node.js](https://nodejs.org/) versi 18 ke atas
- npm (sudah disertakan bersama Node.js) atau pengelola paket lain seperti pnpm/yarn

Cek versinya dengan:

```bash
node --version
npm --version
```

## Cara Menjalankan Secara Lokal

1. Klon repositori:

   ```bash
   git clone https://github.com/sindufha/Bloom-Notes.git
   cd Bloom-Notes
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

4. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

5. Buka peramban dan kunjungi [http://localhost:5173](http://localhost:5173). Setiap perubahan kode akan otomatis dimuat ulang.

## Membangun untuk Produksi

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

### Pasang sebagai Aplikasi

Saat peramban Anda mendeteksi situs ini sebagai PWA, tombol **Pasang aplikasi** akan muncul di navigasi. Tekan tombol itu untuk memasang Bloom sebagai aplikasi terpisah di desktop maupun ponsel Anda.

## Struktur Proyek

```
Bloom-Notes/
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
- Enkripsi dilakukan langsung di peramban memakai Web Crypto API. Setiap entri brankas dan setiap teks terenkripsi menggunakan IV (initialization vector) acak 12 byte.
- `PBKDF2-SHA256` dengan 600.000 iterasi dipakai untuk menurunkan kunci, sehingga serangan brute force menjadi sangat mahal.
- Untuk fitur enkripsi teks, setiap pesan juga menggunakan salt acak 16 byte sehingga kombinasi salt + IV menjamin keunikan tiap ciphertext.
- Karena semua data tersimpan lokal, jika Anda menghapus data peramban (atau memakai mode penyamaran), data Bloom juga akan ikut hilang. Lakukan pencadangan secara manual bila perlu.

## Skrip yang Tersedia

- `npm run dev` — menjalankan server pengembangan dengan hot reload
- `npm run build` — membangun versi produksi ke folder `dist/`
- `npm run preview` — menyajikan hasil build untuk pemeriksaan
- `npm run lint` — menjalankan ESLint pada seluruh kode TypeScript

## Lisensi

Proyek ini dirilis sebagai pribadi untuk keperluan pengguna sendiri. Silakan modifikasi sesuai kebutuhan.

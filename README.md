# Laporan Praktikum Pertemuan 6 - Mobile Programming
## Membangun Diary App dari Awal dengan Expo Router, State, dan React Hooks

### Identitas Mahasiswa
- **Nama:** Bembi Marvi Yuansa
- **NIM:** 2430511088
- **Kelas:** 5C
- **Program Studi:** Teknik Informatika
- **Mata Kuliah:** Mobile Programming (Pertemuan 6)

---

### Deskripsi Proyek
Proyek `diary-app6` adalah aplikasi catatan harian multi-platform yang dibangun menggunakan React Native dan Expo Router. Aplikasi ini berfokus pada implementasi arsitektur State Management dan React Hooks, mencakup pengelolaan local state, shared global state, derived state, side effects dengan timer debounce, ref callback, serta ekstraksi logic ke dalam custom hooks.

---

### Struktur Proyek
```text
diary-app6/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── create.tsx
│   │   ├── favorites.tsx
│   │   ├── index.tsx
│   │   └── settings.tsx
│   ├── detail/
│   │   └── [id].tsx
│   └── _layout.tsx
├── src/
│   ├── components/
│   │   └── DiaryCard.tsx
│   ├── context/
│   │   └── DiaryContext.tsx
│   ├── hooks/
│   │   ├── useDiarySearch.ts
│   │   └── useLikedEntries.ts
│   └── styles/
│       └── tokens.ts
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

---

### Cara Menjalankan Aplikasi
1. Pastikan Node.js dan npm sudah terpasang.
2. Buka terminal pada folder proyek ini:
   ```bash
   npm install
   ```
3. Jalankan server Expo dengan membersihkan cache:
   ```bash
   npx expo start -c
   ```
4. Buka aplikasi **Expo Go** pada smartphone Android/iOS, lalu pindai (scan) QR Code yang muncul di terminal.

---

### Tabel Dokumentasi & Penjelasan React Hooks
Sesuai rubrik dan ketentuan Tugas Bagian V & W:

| No | Hook | Input / Parameter | Output / Return | Dependency Array | Alasan Pemilihan & Fungsi di Aplikasi |
|:---|:---|:---|:---|:---|:---|
| 1 | **useState** | Nilai inisial state (array data awal, string form input, object Set) | Pasangan `[stateValue, setterFunction]` | *(Tidak ada)* | Mengelola local state pada form input (judul, tanggal, isi cerita), status filter mood aktif, dan toggle switch di halaman pengaturan. |
| 2 | **useContext** | Context object (`DiaryContext`) | Shared state & fungsi context (`entries`, `likedIds`, `addEntry`, `toggleLike`, `getById`) | *(Tidak ada)* | Membagikan state catatan diary dan status like secara global ke seluruh screen (Home, Create, Detail, Favorites) tanpa *prop drilling*. |
| 3 | **useEffect** | Callback timer debounce dan dependency `[query]` | Fungsi cleanup (`clearTimeout`) | `[query]` | Menangani sinkronisasi side-effect berbasis timer (350 ms) saat user mengetik di search bar agar pencarian tidak mengeksekusi filter di setiap ketikan huruf. |
| 4 | **useMemo** | Factory function kalkulasi & dependency array | Nilai memoized hasil filter (`filteredEntries`, `favoriteEntries`, `value context`) | `[entries, debouncedQuery, selectedMood]` | Menghindari komputasi ulang penyaringan catatan diary saat komponen melakukan re-render yang tidak berkaitan. |
| 5 | **useRef** | Nilai inisial (`null`) | Objek mutable reference `{ current: T }` | *(Tidak ada)* | Mengakses elemen native `TextInput` secara imperatif untuk memanggil `.focus()` saat tombol Reset/Clear ditekan tanpa memicu re-render. |
| 6 | **useCallback** | Callback function (`openDetail`, `handleReset`) dan dependency | Versi fungsi yang stabil di memori | `[router]`, `[resetFilters]` | Menjaga referensi fungsi handler tetap stabil saat dipassing sebagai props atau event listener komponen anak. |

---

### Fitur yang Berhasil Diimplementasikan
- [x] Struktur modular resmi Expo Router (`app/` dan `src/`).
- [x] Shared state global menggunakan `DiaryProvider` dan `useContext`.
- [x] Fitur filter kategori Mood (`😊`, `🎯`, `😌`, `🥳`) berbasis `useState` dan `useMemo`.
- [x] Pencarian real-time dengan timer debounce 350ms dan cleanup `useEffect`.
- [x] Tombol Reset Filter yang mengosongkan search text, mood filter, dan memfokuskan kembali `TextInput` via `useRef`.
- [x] Custom Hook `useDiarySearch` untuk memisahkan logic pencarian dari antarmuka.
- [x] Custom Hook `useLikedEntries` untuk mengelola data catatan yang disukai.
- [x] Tab Favorit (`favorites.tsx`) yang tersinkronisasi dua arah dengan Home dan Detail.
- [x] Redesain antarmuka modern, responsif, dan rapi sesuai token desain.

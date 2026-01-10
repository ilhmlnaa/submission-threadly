# Threadly - React Redux

Aplikasi forum diskusi modern yang dibangun dengan React dan Redux, menggunakan Dicoding Forum API.

## Fitur

### Kriteria Utama

- ✅ Registrasi dan Login pengguna
- ✅ Menampilkan daftar thread
- ✅ Detail thread dengan komentar
- ✅ Membuat thread baru
- ✅ Membuat komentar pada thread
- ✅ Loading indicator

### Fitur Tambahan

- ✅ **Voting System**: Up-vote dan down-vote thread dan komentar dengan optimistic UI updates
- ✅ **Leaderboards**: Menampilkan top contributors
- ✅ **Category Filter**: Filter thread berdasarkan kategori
- ✅ **Dark/Light Theme**: Toggle antara dark mode dan light mode
- ✅ **Multi-language Support**: Bahasa Inggris dan Indonesia
- ✅ **Responsive Design**: Tampilan yang responsif untuk mobile dan desktop

## Tech Stack

- **React 19** - UI Library
- **Redux Toolkit** - State Management
- **React Router DOM** - Routing
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vite** - Build Tool
- **ESLint** - Code Linting (Dicoding Academy Style Guide)

## Instalasi

1. Clone repository ini
2. Install dependencies:

   ```bash
   npm install
   ```

3. Jalankan development server:

   ```bash
   npm run dev
   ```

4. Buka browser dan akses `http://localhost:5173`

## Build Production

```bash
npm run build
```

## Linting

```bash
npm run lint
```

## Struktur Folder

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── states/          # Redux states (actions & reducers)
│   ├── authUser/
│   ├── isPreload/
│   ├── users/
│   ├── threads/
│   ├── threadDetail/
│   ├── leaderboards/
│   ├── theme/
│   └── shared/
├── hooks/           # Custom hooks
├── utils/           # Utility functions
└── main.jsx         # Entry point
```

## Arsitektur

- State management menggunakan Redux dengan pattern action-reducer
- Semua API calls dilakukan di Redux actions (thunk)
- Komponen UI terpisah dari state logic
- Komponen bersifat modular dan reusable

## API

Menggunakan [Dicoding Forum API](https://forum-api.dicoding.dev/v1/)

## Author

**Ilham Maulana**

Submission pertama untuk kelas "Menjadi React Web Developer Expert" - Dicoding Academy

## License

MIT

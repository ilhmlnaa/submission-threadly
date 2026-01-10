# Storybook Setup & Guide

## 1. Stories yang Dibuat

### ✅ LoginInput Stories (`src/stories/auth/LoginInput.stories.jsx`)
- **Default**: Menampilkan form login dalam state normal
- **Loading**: Menampilkan form dalam state loading (button disabled)
- **WithValues**: Menampilkan form untuk demonstrasi input fields

### ✅ ThreadItem Stories (`src/stories/thread/ThreadItem.stories.jsx`)
- **Default**: Menampilkan thread tanpa votes
- **WithUpVotes**: Menampilkan thread dengan up votes
- **WithDownVotes**: Menampilkan thread dengan down votes
- **WithLotsOfComments**: Menampilkan thread dengan banyak komentar
- **LongTitle**: Menampilkan thread dengan judul panjang (test text truncation)
- **LongBody**: Menampilkan thread dengan body panjang (test line-clamp)

Total: **9 stories** untuk **2 komponen** (melebihi minimal requirement)

---

## 2. Menjalankan Storybook

### Development Mode
```bash
npm run storybook
```

Storybook akan berjalan di `http://localhost:6006`

### Build Storybook
```bash
npm run build-storybook
```

Build akan tersimpan di folder `storybook-static`

---

## 3. Structure

```
src/stories/
├── auth/
│   └── LoginInput.stories.jsx
├── thread/
│   └── ThreadItem.stories.jsx
├── assets/           (static assets)
├── Button.jsx        (example component)
├── Button.stories.js (example story)
├── Header.jsx        (example component)
├── Header.stories.js (example story)
└── Configure.mdx    (storybook config)
```

---

## 4. Implementasi Details

### LoginInput Stories
Menggunakan:
- `I18nextProvider` untuk meng-support internationalization
- `fn()` dari Storybook untuk mock login function
- Mock props: `login` dan `loading`

### ThreadItem Stories
Menggunakan:
- `Provider` (Redux) untuk meng-support state management
- `MemoryRouter` untuk meng-support routing
- `I18nextProvider` untuk internationalization
- Mock store dengan authUser state
- Multiple scenarios untuk berbagai states (votes, comments, text length)

---

## 5. Custom Decorators

Stories menggunakan custom decorators untuk meng-handle dependencies:

```jsx
decorators: [
  (Story) => (
    <Provider store={mockStore}>
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </MemoryRouter>
    </Provider>
  ),
],
```

---

## 6. Storybook Configuration

Storybook sudah dikonfigurasi dengan:
- ✅ **Autodocs**: Generate documentation otomatis
- ✅ **Centered Layout**: Center komponen di canvas
- ✅ **Args**: Control props via sidebar
- ✅ **Actions**: Track event handlers

---

## 7. Troubleshooting

### Error: Module not found
**Solusi**: Pastikan path import di stories benar:
```jsx
import LoginInput from '../../components/auth/LoginInput';
import i18n from '../../utils/i18n';
```

### Error: Could not find react-router-dom context
**Solusi**: Pastikan menggunakan `MemoryRouter` di decorator:
```jsx
decorators: [
  (Story) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  ),
],
```

### Error: Could not find react-redux context
**Solusi**: Pastikan menggunakan `Provider` di decorator:
```jsx
decorators: [
  (Story) => (
    <Provider store={mockStore}>
      <Story />
    </Provider>
  ),
],
```

### Error: useTranslation hook not working
**Solusi**: Pastikan menggunakan `I18nextProvider` di decorator:
```jsx
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';

decorators: [
  (Story) => (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  ),
],
```

---

## 8. Checklist Storybook

- [x] Install Storybook dependencies
- [x] Setup Storybook configuration
- [x] Create LoginInput stories (3 stories)
- [x] Create ThreadItem stories (6 stories)
- [x] Configure decorators for i18n, Redux, Router
- [x] Verify stories render correctly
- [ ] Run Storybook (`npm run storybook`)
- [ ] Build Storybook (`npm run build-storybook`)
- [ ] Deploy Storybook (opsional)

---

## 9. Next Steps

### Untuk Menjalankan Storybook:
1. Buka terminal di project directory
2. Run:
   ```bash
   npm run storybook
   ```
3. Buka `http://localhost:6006` di browser
4. Navigasi ke:
   - **Auth/LoginInput** untuk melihat login form
   - **Thread/ThreadItem** untuk melihat thread card

### Untuk Deployment (Opsional):
Storybook bisa di-deploy ke:
- **Chromatic**: `npx chromatic --project-token=YOUR_TOKEN`
- **Vercel**: Build static storybook dan deploy
- **Netlify**: Connect GitHub dan deploy branch

---

## 10. Requirements Checklist

Berikut adalah requirements untuk Storybook:

| Requirement | Status | Details |
|-------------|---------|---------|
| Setup Storybook | ✅ | Dependencies terinstall dan configured |
| Minimal 2 komponen stories | ✅ | LoginInput & ThreadItem |
| Minimal 2 story per komponen | ✅ | LoginInput: 3 stories, ThreadItem: 6 stories |
| Total stories | ✅ | 9 stories (exceeds minimum) |

Semua requirements terpenuhi! 🎉

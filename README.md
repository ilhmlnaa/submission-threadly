# Threadly - Forum Diskusi Modern

Aplikasi forum diskusi React + Redux dengan fitur voting, multi-language, dan dark mode.

## Fitur

- 🔐 **Authentication**: Login & Register
- 💬 **Threads**: Create, view, dan discuss threads
- 🗳️ **Voting**: Up/down vote dengan optimistic UI
- 🏆 **Leaderboards**: Top contributors
- 🌙 **Theme**: Dark & light mode
- 🌐 **Multi-language**: English & Bahasa Indonesia
- 📱 **Responsive**: Mobile & desktop friendly

## Tech Stack

### Core
- **React 19** + **Redux Toolkit** - State management
- **React Router DOM v7** - Routing
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool

### UI/UX
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **i18next** - Internationalization

### Testing & CI/CD
- **Vitest** - Unit & integration tests
- **React Testing Library** - Component tests
- **Cypress** - E2E tests
- **Storybook** - Component documentation
- **GitHub Actions** - CI/CD automation

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |

### Testing
| Command | Description |
|---------|-------------|
| `npm test` | Run unit & integration tests |
| `npm run test:ui` | Run Vitest UI |
| `npm run e2e:open` | Open Cypress Test Runner |
| `npm run e2e` | Run E2E tests headless |
| `npm run ci:test` | Run all tests (CI mode) |

### Storybook
| Command | Description |
|---------|-------------|
| `npm run storybook` | Start Storybook dev server |
| `npm run build-storybook` | Build Storybook static |

## Testing

### Coverage
- **Unit Tests**: Reducers (authUser, threads) ✅
- **Integration Tests**: Thunk actions (authUser, threads) ✅
- **Component Tests**: LoginInput, ThreadItem, RegisterInput ✅
- **E2E Tests**: Login flow ✅

### Test Stats
```
Test Files:  7 passed
Tests:       31 passed (100%)
```

## Storybook

Komponen yang didokumentasikan:
- **LoginInput** - 3 stories (Default, Loading, WithValues)
- **ThreadItem** - 6 stories (Default, WithUpVotes, WithDownVotes, etc.)

Jalankan: `npm run storybook` → `http://localhost:6006`

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── auth/       # Login, Register inputs
│   ├── thread/     # Thread card, form
│   └── ...
├── pages/          # Route pages (Home, Detail, etc.)
├── states/         # Redux slices
│   ├── authUser/   # Auth state
│   ├── threads/     # Threads state
│   └── ...
├── hooks/          # Custom React hooks
├── utils/          # Helper functions (API, i18n, etc.)
├── layouts/        # Page layouts (Main, Auth)
└── stories/        # Storybook stories
```

## API

Menggunakan [Dicoding Forum API](https://forum-api.dicoding.dev/v1/)

- POST `/register` - Register user
- POST `/login` - Login user
- GET `/threads` - Get all threads
- POST `/threads` - Create thread
- GET `/threads/:id` - Get thread detail
- POST `/threads/:id/comments` - Add comment
- POST `/threads/:id/up-vote` - Up vote thread
- POST `/threads/:id/down-vote` - Down vote thread
- GET `/leaderboards` - Get top users

## Deployment

### Vercel
1. Push code to GitHub
2. Import repository to Vercel
3. Configure: Vite preset, build command `npm run build`
4. Deploy

### CI/CD
GitHub Actions workflow (`.github/workflows/ci.yml`):
- Linting check
- Unit & integration tests
- E2E tests
- Build verification

## Author

**Ilham Maulana**

Submission #2 - Menjadi React Web Developer Expert @ Dicoding Academy

## License

MIT


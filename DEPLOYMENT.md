# Deployment & CI/CD Guide

## 1. Vercel Deployment

### Step 1: Login ke Vercel
1. Buka [vercel.com](https://vercel.com)
2. Login menggunakan GitHub account

### Step 2: Import Project
1. Klik "Add New" -> "Project"
2. Import repository `submission-2-threadly-v2` dari GitHub
3. Jika repository belum ada di GitHub, push terlebih dahulu:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <YOUR-GITHUB-REPO-URL>
   git push -u origin main
   ```

### Step 3: Configure Project
1. **Framework Preset**: Pilih "Vite"
2. **Root Directory**: Biarkan default (./)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### Step 4: Environment Variables (Opsional)
Jika project membutuhkan environment variables:
1. Di bagian "Environment Variables", tambahkan:
   - `VITE_API_BASE_URL`: `https://forum-api.dicoding.dev/v1`
2. Klik "Add" untuk setiap variable

### Step 5: Deploy
1. Klik "Deploy"
2. Tunggu proses deployment selesai
3. Project akan otomatis deploy setiap kali push ke branch `main`

---

## 2. GitHub Actions CI/CD

CI/CD sudah dikonfigurasi di `.github/workflows/ci.yml`. Pipeline ini akan:
- Trigger pada push ke `main/master` dan Pull Request
- Run linting (`npm run lint`)
- Run unit tests (`npm test`)
- Run E2E tests (`npm run e2e`)
- Build application (`npm run build`)

---

## 3. Branch Protection

### Step 1: Buka Branch Protection Settings
1. Buka repository di GitHub
2. Go to Settings -> Branches
3. Cari branch `main` (atau `master`), klik tombol "Edit" (ikon pensil)

### Step 2: Configure Protection Rules

#### A. Require Pull Request Reviews
1. ✅ Check "Require pull request reviews before merging"
2. **Number of required approving reviewers**: Set minimal `1`
3. ⬜ Uncheck "Dismiss stale PR approvals when new commits are pushed" (optional)
4. ⬜ Uncheck "Require review from CODEOWNERS" (optional)
5. ✅ Check "Require approval from the repository's code owners" (jika ada CODEOWNERS)
6. ✅ Check "Require a review from code owners when there are changes to the code owners file" (optional)

#### B. Require Status Checks to Pass Before Merging
1. ✅ Check "Require status checks to pass before merging"
2. Di bagian "Search for status checks", pilih:
   - `ci/test` (atau nama workflow yang muncul)
3. ✅ Check "Require branches to be up to date before merging"

#### C. Restrict Who Can Push
1. ✅ Check "Do not allow bypassing the above settings"
2. ✅ Check "Restrict who can push to matching branches"
3. Di bagian "Teams and people who can push", biarkan kosong atau tambahkan admin saja
4. ⬜ Uncheck "Allow specified actors to bypass required pull requests" (recommended)

#### D. Require Conversation Resolution
1. ✅ Check "Require conversation resolution before merging" (recommended)

### Step 3: Save Changes
1. Klik "Create" atau "Save changes"
2. Setelah ini, semua perubahan ke branch `main` harus melalui Pull Request dengan reviews

---

## 4. Evidence Screenshots

Ambil screenshot untuk submission:

### Screenshot 1: CI Check Error (1_ci_check_error.png)
1. Buat perubahan sengaja yang menyebabkan test fail (misal: ubah reducer logic)
2. Commit dan push ke branch baru
3. Buka Pull Request di GitHub
4. Screenshot tab "Checks" yang menunjukkan test failure

### Screenshot 2: CI Check Pass (2_ci_check_pass.png)
1. Perbaiki code yang menyebabkan test fail
2. Push perubahan
3. Screenshot tab "Checks" yang menunjukkan semua tests pass (✅)

### Screenshot 3: Branch Protection (3_branch_protection.png)
1. Buka halaman Pull Request
2. Screenshot bagian yang menunjukkan:
   - "Required approving reviews"
   - "Required status checks"
   - "Branch is up to date" indicator

Simpan screenshots di folder `/screenshots/` di root project.

---

## 5. Testing Commands

### Run Unit Tests
```bash
npm test
```

### Run Unit Tests with Coverage
```bash
npm run test:coverage
```

### Run E2E Tests
```bash
npm run e2e:open
```

### Run E2E Tests (Headless)
```bash
npm run e2e
```

### Run All Tests (CI)
```bash
npm run ci:test
```

### Linting
```bash
npm run lint
```

---

## 6. Checklist Submission

- [ ] Install testing dependencies (Vitest, React Testing Library, Cypress)
- [ ] Setup Vitest configuration
- [ ] Setup Cypress configuration
- [ ] Create unit tests (minimum 2 reducers)
- [ ] Create integration tests (minimum 2 thunks)
- [ ] Create component tests (minimum 2 components)
- [ ] Create E2E test for login flow
- [ ] Setup GitHub Actions workflow
- [ ] Deploy ke Vercel
- [ ] Setup branch protection
- [ ] Ambil 3 screenshot evidence
- [ ] Verify semua tests pass
- [ ] Push ke GitHub dan verify CI/CD works

---

## 7. Troubleshooting

### CI/CD Fails on Vercel
- Pastikan environment variables sudah di-set dengan benar
- Cek build logs di Vercel Dashboard

### Tests Fail Locally
- Pastikan semua dependencies terinstall: `npm install`
- Hapus `node_modules` dan `package-lock.json`, lalu install ulang

### Branch Protection Not Working
- Pastikan nama branch yang di-protect sesuai dengan default branch (`main` atau `master`)
- Pastikan Anda memiliki admin permissions di repository

### E2E Tests Timeout
- Pastikan aplikasi running di port 5173
- Periksa `cypress.config.js` baseUrl settings

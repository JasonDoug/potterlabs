# Potter Labs Documentation

A modern, responsive documentation site for Potter Labs AI services, built with Next.js, shadcn/ui, and Tailwind CSS.

## 🚀 Live Sites

- **Production:** [https://same-6r4585pklto-latest.netlify.app](https://same-6r4585pklto-latest.netlify.app)
- **GitHub:** [https://github.com/Jpotter702/potterlabs-docs](https://github.com/Jpotter702/potterlabs-docs)

## ✨ Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark/Light Mode** - Toggle between themes
- 🧭 **Smart Navigation** - Collapsible sidebar with breadcrumbs
- 📖 **API Documentation** - Complete guides for AI services
- ⚡ **Fast Performance** - Optimized with Next.js static export
- 🎨 **Modern UI** - Built with shadcn/ui components

## 🛠 Tech Stack

- **Framework:** Next.js 15 with TypeScript
- **UI Components:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Package Manager:** Bun
- **Deployment:** Netlify & Vercel ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jpotter702/potterlabs-docs.git
   cd potterlabs-docs
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run start    # Start production server
bun run lint     # Run linting and type checking
bun run format   # Format code with Biome
```

## 🚀 Deployment

### Automatic Deployments (Recommended)

Both Netlify and Vercel are configured for automatic deployments when you push to the `master` branch.

### Option 1: Netlify Deployment

#### Automatic Setup (via GitHub)
1. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select `Jpotter702/potterlabs-docs`

2. **Configure Build Settings:**
   - **Build command:** `bun run build`
   - **Publish directory:** `out`
   - **Node version:** `18` (or latest)

3. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically deploy on every push to master

#### Manual CLI Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build and deploy
bun run build
netlify deploy --prod --dir=out
```

### Option 2: Vercel Deployment

#### Automatic Setup (via GitHub)
1. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Import `Jpotter702/potterlabs-docs` from GitHub

2. **Configure Project:**
   - **Framework:** Next.js
   - **Build Command:** `bun run build`
   - **Output Directory:** `out`
   - **Install Command:** `bun install`

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to master

#### Manual CLI Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
bun run build
vercel --prod
```

## 🔧 GitHub Actions (Automatic CI/CD)

The repository includes GitHub Actions for automated testing and deployment:

### Setting up Secrets

Add these secrets to your GitHub repository settings:

#### For Netlify:
- `NETLIFY_AUTH_TOKEN` - Your Netlify personal access token
- `NETLIFY_SITE_ID` - Your site ID from Netlify

#### For Vercel:
- `VERCEL_TOKEN` - Your Vercel access token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

### Workflow Features:
- ✅ Automated testing and linting
- ✅ Build verification
- ✅ Automatic deployment to both platforms
- ✅ Runs on every push to master

## 📁 Project Structure

```
potterlabs-docs/
├── .github/workflows/     # GitHub Actions
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── guide/        # Documentation pages
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── docs-layout.tsx
│   └── lib/             # Utilities
├── netlify.toml         # Netlify configuration
├── vercel.json          # Vercel configuration
├── next.config.js       # Next.js configuration
└── tailwind.config.ts   # Tailwind configuration
```

## 🎨 Customization

### Adding New Pages
1. Create a new file in `src/app/guide/your-page/page.tsx`
2. Update the sidebar navigation in `src/components/docs-layout.tsx`
3. Add the new route to navigation

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Use Tailwind CSS classes
- Theme colors: Modify `tailwind.config.ts`

### Components
- All UI components are in `src/components/ui/`
- Add new shadcn/ui components: `bunx shadcn@latest add component-name`

## 🔗 Links

- **Live Site:** https://same-6r4585pklto-latest.netlify.app
- **GitHub:** https://github.com/Jpotter702/potterlabs-docs
- **Potter Labs:** https://potterlabs.xyz

## 📄 License

This project is private and proprietary to Potter Labs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Commit: `git commit -m "Add new feature"`
5. Push: `git push origin feature/new-feature`
6. Open a pull request

---

Built with ❤️ using [Same](https://same.new)

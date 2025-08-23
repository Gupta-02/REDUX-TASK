# BlogCraft - Modern Blog Platform

A modern, full-stack blog platform built with React, TypeScript, Convex, and Tailwind CSS.

## Features

- ✨ **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- 🔐 **Authentication** - Secure user authentication with Convex Auth
- 📝 **Rich Blogging** - Create, edit, and manage blog posts
- 🔍 **Search & Discovery** - Full-text search functionality
- 📊 **Analytics** - View counts and engagement metrics
- 🏷️ **Tagging System** - Organize posts with tags
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Real-time Updates** - Live data synchronization

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Convex (Database + API)
- **Authentication**: Convex Auth
- **Routing**: React Router
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd blogcraft
```

2. Install dependencies
```bash
npm install
```

3. Set up Convex
```bash
npx convex dev
```

4. Start the development server
```bash
npm run dev
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `CONVEX_DEPLOYMENT`
   - `VITE_CONVEX_URL`
4. Deploy!

### Environment Variables

Create a `.env.local` file with:
```
CONVEX_DEPLOYMENT=your-deployment-name
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Navigation, footer, layout
│   ├── Blog/           # Blog-specific components
│   └── UI/             # Generic UI components
├── pages/              # Page components
├── lib/                # Utilities and helpers
└── main.tsx           # App entry point

convex/
├── schema.ts          # Database schema
├── posts.ts           # Post-related functions
├── comments.ts        # Comment functions
├── auth.ts            # Authentication setup
└── seedData.ts        # Sample data
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

# Redux Task Next.js App

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd redux-task
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Next.js routing with `src/app` structure
- SSR/SSG implemented for blogs
- API routes for `/api/auth` and `/api/posts` (proxying DummyJSON)
- Advanced SEO meta tags (Open Graph, Twitter cards, canonical URLs)
- Reusable components: Button, Card, ItemList, Loader, Navbar, Sidebar
- Consistent styling with Tailwind CSS
- Dashboard with sidebar navigation
- Authentication and posts via DummyJSON API

## Deployment
- Push to GitHub
- Connect to Vercel for live demo
- [Live Demo Screenshot](public/screenshot.png)

## Implementation Notes
- SSR/SSG: See `src/app/blogs/page.js` and `[id]/page.js`
- API routes: See `src/app/api/auth/route.js` and `src/app/api/posts/route.js`
- SEO: See `src/app/layout.tsx` and page files
- Styling: Tailwind classes used throughout

## Screenshots
![Home](public/screenshot-home.png)
![Dashboard](public/screenshot-dashboard.png)

## Credits
- [Next.js Documentation](https://nextjs.org/docs)
- [DummyJSON API](https://dummyjson.com)
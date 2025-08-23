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
  <img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/96a429fa-ea6c-4ba1-af05-264589b645cb" />


## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Convex (Database + API)
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

### Vercel Deploymen
4. Deploy!
<img width="1915" height="865" alt="image" src="https://github.com/user-attachments/assets/f0c33c32-fe81-4465-9a1b-b8a7a8f7c9b5" />


### Environment Variables

Create a `.env.local` file with:
```
CONVEX_DEPLOYMENT=your-deployment-name
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

## Project Structure

```
my-nextjs-blog/
├── components/
│   ├── Button/
│   ├── Card/
│   ├── ItemList/
│   ├── Navbar/
│   └── Loader/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   └── posts/
│   ├── index.js         # Home page
│   ├── about.js
│   ├── contact.js
│   ├── blog/
│   │   ├── index.js     # Blog list
│   │   └── [id].js      # Blog detail
│   └── login.js
├── store/
│   ├── index.js         # Store configuration
│   ├── slices/
│   │   ├── authSlice.js
│   │   └── postsSlice.js
│   ├── sagas/
│   │   ├── authSaga.js
│   │   └── postsSaga.js
│   └── rootSaga.js
├── styles/
│   ├── globals.css
│   ├── tailwind.css
│   └── components/
│       └── ...css
├── utils/
│   ├── api.js           # Axios or fetch wrappers
│   └── helpers.js
├── services/
│   ├── authService.js
│   └── postService.js
├── public/
│   └── images/
├── .env.local           # Environment variables
├── next.config.js
├── tailwind.config.js
├── jsconfig.json        # Path aliases (optional)
└── README.md


```
<img width="269" height="711" alt="image" src="https://github.com/user-attachments/assets/e58d0ef0-7f2c-4c40-b683-e14e8e4d0a44" />

## Available Scripts

- `npm run dev` - Start development server
- <img width="1919" height="602" alt="image" src="https://github.com/user-attachments/assets/2ef004e1-4912-46c1-953d-2b9bc8515df9" />

- `npm run build` - Build for production
<img width="1005" height="304" alt="image" src="https://github.com/user-attachments/assets/8c3089c5-a360-4606-92fa-4d0ef0381d07" />

- `npm run preview` - Preview production build

- `npm run lint` - Run ESLint
![Uploading image.png…]()

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

import React from "react";

const workspaceFiles = [
  "components/Button/Button.jsx",
  "components/Card/Card.jsx",
  "components/ItemList/ItemList.jsx",
  "components/Loader/Loader.jsx",
  "components/Navbar/Navbar.jsx",
  "convex/auth.config.ts",
  "convex/auth.ts",
  "convex/comments.ts",
  "convex/dummyJsonIntegration.ts",
  "convex/http.ts",
  "convex/posts.ts",
  "convex/router.ts",
  "convex/schema.ts",
  "convex/seedData.ts",
  "pages/_app.js",
  "pages/_document.js",
  "pages/about.js",
  "pages/contact.js",
  "pages/index.js",
  "pages/login.js",
  "pages/api/auth/login.js",
  "pages/api/posts/[id].js",
  "pages/api/posts/index.js",
  "pages/api/posts/search.js",
  "pages/blog/[id].js",
  "pages/blog/index.js",
  "pages/dashboard/index.js",
  "pages/dashboard/posts/index.js",
  "pages/dashboard/posts/new.js",
  "pages/dashboard/posts/edit/[id].js",
  "services/authService.js",
  "services/postService.js",
  "src/App.tsx",
  "src/index.css",
  "src/main.tsx",
  "src/SignInForm.tsx",
  "src/SignOutButton.tsx",
  "src/components/Blog/PostCard.tsx",
  "src/components/Blog/PostList.tsx",
  "src/components/Dashboard/DashboardLayout.tsx",
  "src/components/Layout/Footer.tsx",
  "src/components/Layout/Layout.tsx",
  "src/components/Layout/Navbar.tsx",
  "src/components/UI/Button.tsx",
  "src/components/UI/Card.tsx",
  "src/components/UI/Loader.tsx",
  "src/lib/utils.ts",
  "src/pages/AboutPage.tsx",
  "src/pages/BlogDetailPage.tsx",
  "src/pages/BlogPage.tsx",
  "src/pages/ContactPage.tsx",
  "src/pages/DashboardPage.tsx",
  "src/pages/DashboardPostsPage.tsx",
  "src/pages/HomePage.tsx",
  "src/pages/LoginPage.tsx",
  "src/pages/NewPostPage.tsx",
  "store/index.js",
  "store/rootSaga.js",
  "store/sagas/authSaga.js",
  "store/sagas/postsSaga.js",
  "store/slices/authSlice.js",
  "store/slices/postsSlice.js",
  "styles/globals.css",
  "utils/api.js",
  "utils/helpers.js"
];

const WorkspaceExplorer = () => (
  <div className="max-w-4xl mx-auto py-12">
    <h1 className="text-4xl font-bold mb-8 text-center">Workspace Explorer</h1>
    <ul className="bg-white rounded-lg shadow p-6">
      {workspaceFiles.map((file) => (
        <li key={file} className="py-2 border-b last:border-b-0 text-gray-700">
          {file}
        </li>
      ))}
    </ul>
  </div>
);

export default WorkspaceExplorer;

import { Authenticated, Unauthenticated } from "convex/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardPostsPage from "./pages/DashboardPostsPage";
import NewPostPage from "./pages/NewPostPage";
import LoginPage from "./pages/LoginPage";
import WorkspaceExplorer from "./pages/WorkspaceExplorer";
import FetchPage from "./pages/FetchPage.tsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Routes>
          <Route path="/login" element={
            <Unauthenticated>
              <LoginPage />
            </Unauthenticated>
          } />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/fetch" element={<FetchPage />} />
                <Route path="/dashboard" element={
                  <Authenticated>
                    <DashboardPage />
                  </Authenticated>
                } />
                <Route path="/dashboard/posts" element={
                  <Authenticated>
                    <DashboardPostsPage />
                  </Authenticated>
                } />
                <Route path="/dashboard/posts/new" element={
                  <Authenticated>
                    <NewPostPage />
                  </Authenticated>
                } />
                <Route path="/workspace-explorer" element={<WorkspaceExplorer />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

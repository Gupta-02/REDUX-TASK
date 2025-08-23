import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  const sidebarLinks = [
    { href: "/dashboard", label: "Overview", icon: "📊" },
    { href: "/dashboard/posts", label: "My Posts", icon: "📝" },
    { href: "/dashboard/posts/new", label: "New Post", icon: "➕" },
    { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
        </div>
        <nav className="px-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={clsx(
                "flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === link.href
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}

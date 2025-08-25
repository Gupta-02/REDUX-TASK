import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-gradient-to-b from-blue-600 to-purple-600 text-white p-6 rounded-r-xl shadow-lg flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="hover:bg-blue-700 px-4 py-2 rounded transition">Home</Link>
        <Link href="/blogs" className="hover:bg-blue-700 px-4 py-2 rounded transition">Blogs</Link>
        <Link href="/about" className="hover:bg-blue-700 px-4 py-2 rounded transition">About</Link>
        <Link href="/contact" className="hover:bg-blue-700 px-4 py-2 rounded transition">Contact</Link>
      </nav>
    </aside>
  );
}
"use client";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../src/store/slices/authSlice";
import Button from './Button';

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  return (
    <nav style={{background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)", padding: "1rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderRadius: "0 0 16px 16px"}}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <div style={{display: "flex", alignItems: "center", gap: "1.5rem"}}>
          <a href="/" style={{fontWeight: "bold", fontSize: "1.5rem", color: "#fff", letterSpacing: "1px", textShadow: "0 1px 4px #333"}}>MyBlog</a>
          <a href="/about" style={{color: "#fff", fontSize: "1rem", padding: "0.5rem 1rem", borderRadius: "8px", transition: "background 0.2s", textDecoration: "none"}}>About</a>
          <a href="/contact" style={{color: "#fff", fontSize: "1rem", padding: "0.5rem 1rem", borderRadius: "8px", transition: "background 0.2s", textDecoration: "none"}}>Contact</a>
          {isAuthenticated && (
            <>
              <a href="/blogs" style={{color: "#fff", fontSize: "1rem", padding: "0.5rem 1rem", borderRadius: "8px", transition: "background 0.2s", textDecoration: "none"}}>Blogs</a>
              <a href="/dashboard" style={{color: "#fff", fontSize: "1rem", padding: "0.5rem 1rem", borderRadius: "8px", transition: "background 0.2s", textDecoration: "none"}}>Dashboard</a>
            </>
          )}
        </div>
        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
          {isAuthenticated ? (
            <>
              <span style={{color: "#fff", fontWeight: "500", marginRight: "1rem"}}>Welcome, {user?.username}</span>
              <button onClick={handleLogout} style={{background: "#fff", color: "#764ba2", border: "none", borderRadius: "8px", padding: "0.5rem 1.2rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 1px 4px #333", transition: "background 0.2s"}}>Logout</button>
            </>
          ) : (
            <a href="/login" style={{background: "#fff", color: "#764ba2", borderRadius: "8px", padding: "0.5rem 1.2rem", fontWeight: "bold", textDecoration: "none", boxShadow: "0 1px 4px #333", transition: "background 0.2s"}}>Login</a>
          )}
        </div>
      </div>
    </nav>
  );
}
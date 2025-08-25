"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
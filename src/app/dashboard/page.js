"use client";
import React from "react";
import Sidebar from "../../../components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-lg">Welcome to your dashboard. Use the sidebar to navigate.</p>
      </main>
    </div>
  );
}
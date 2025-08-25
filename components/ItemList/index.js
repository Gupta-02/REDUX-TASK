"use client";
import React from "react";

export default function ItemList({ items, renderItem, className = "" }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded text-center text-gray-500">No items to display.</div>
    );
  }
  return (
    <ul className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
      {items.map((item, idx) => (
        <li key={item.id || idx} className="bg-white rounded shadow p-4 hover:shadow-lg transition">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
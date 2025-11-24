"use client";
import React from "react";
import { useParams } from "next/navigation";
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const color = params.storeSlug === 'sparkle-wash' ? '#2563eb' : '#e11d48';
  return (
    <div style={{ "--brand-primary": color } as React.CSSProperties} className="min-h-screen bg-white">
       <header className="h-16 border-b flex items-center justify-center font-bold text-xl">Store: {params.storeSlug}</header>
       <main className="p-4">{children}</main>
    </div>
  );
}
const fs = require('fs');
const path = require('path');

const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};

const writeFile = (filePath, content) => {
    const absolutePath = path.join(__dirname, filePath);
    ensureDirectoryExistence(absolutePath);
    fs.writeFileSync(absolutePath, content.trim());
    console.log(`✅ Created: ${filePath}`);
};

console.log("🐝 Building The Laundry Hive (Golden Edition)...");

// 1. PACKAGE JSON
writeFile('package.json', `
{
  "name": "the-laundry-hive",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18",
    "react-dom": "^18",
    "firebase": "^10.8.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.344.0",
    "date-fns": "^3.3.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
`);

// 2. CONFIG FILES (WITH THE FIXES)
writeFile('tsconfig.json', `
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`);

writeFile('tailwind.config.ts', `
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { primary: "var(--brand-primary)", secondary: "var(--brand-secondary)" },
        hive: { primary: "#f59e0b", dark: "#0f172a", light: "#f8fafc", accent: "#fbbf24" }
      },
    },
  },
  plugins: [],
};
export default config;
`);

writeFile('postcss.config.mjs', `
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
export default config;
`);

// 3. APP STRUCTURE & STYLES
writeFile('app/globals.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;
:root { --brand-primary: #f59e0b; --brand-secondary: #0f172a; }
body { @apply bg-slate-50 text-slate-900; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`);

writeFile('app/layout.tsx', `
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "The Laundry Hive", description: "Operator-First SaaS" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
`);

// 4. THE LANDING PAGE (CLEAN VERSION)
writeFile('app/page.tsx', `
"use client";
import Link from "next/link";
import { Hexagon, ArrowRight, CheckCircle, Star } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-hive-dark text-hive-light flex flex-col relative overflow-hidden">
      <nav className="relative z-20 max-w-7xl mx-auto w-full p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Hexagon className="text-hive-primary fill-hive-primary" size={32} />
          <span className="text-2xl font-extrabold tracking-tight">The<span className="text-hive-primary">Laundry</span>Hive</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/dashboard/kanban" className="hover:text-hive-primary text-sm font-semibold">Operator Login</Link>
          <Link href="/sparkle-wash" className="px-5 py-2 rounded-full bg-hive-primary text-hive-dark font-bold hover:brightness-110 transition">Demo Store</Link>
        </div>
      </nav>
      <section className="relative z-10 text-center max-w-5xl mx-auto pt-28 pb-40 px-6">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 blur-[130px] w-[200px] h-[200px] rounded-full bg-hive-primary/10 pointer-events-none"></div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-tight text-white">The All-In-One OS <span className="block text-hive-primary">For Modern Laundromats</span></h1>
        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">Finally — a clean, simple operating system for laundromat owners.</p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/dashboard/kanban" className="bg-hive-primary text-hive-dark px-10 py-4 rounded-full font-extrabold text-lg shadow-xl hover:scale-[1.03] transition-all flex items-center gap-2">Start Free Trial <ArrowRight /></Link>
        </div>
      </section>
    </div>
  );
}
`);

// 5. TYPES & MOCK DATABASE
writeFile('types/index.ts', `
export type OrderStatus = 'new' | 'washing' | 'drying' | 'folding' | 'ready' | 'out_for_delivery' | 'completed';
export interface Order { id: string; storeId: string; customerName: string; status: OrderStatus; type: 'pickup' | 'dropoff'; totalPrice: number; createdAt: number; address: string; }
export interface Store { id: string; slug: string; branding: { primaryColor: string; storeName: string; }; }
`);

writeFile('lib/firebase/config.ts', `
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = { apiKey: "DEMO", authDomain: "demo", projectId: "demo" };
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
`);

writeFile('lib/store-context.tsx', `
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Store } from "@/types";
const StoreContext = createContext<{ store: Store | null }>({ store: null });
export const useStore = () => useContext(StoreContext);
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Store | null>(null);
  useEffect(() => { setStore({ id: "1", slug: "sparkle-wash", branding: { primaryColor: "#2563eb", storeName: "Sparkle Wash" }}); }, []);
  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
};
`);

// 6. DASHBOARD COMPONENTS
writeFile('components/kanban/OrderCard.tsx', `
import React from "react";
import { Order } from "@/types";
import { ChevronRight, ChevronLeft } from "lucide-react";
export const OrderCard = ({ order }: { order: Order }) => (
  <div className="bg-white p-4 rounded-lg shadow border border-slate-200 mb-3">
    <div className="flex justify-between"><span className="font-bold text-slate-900">{order.customerName}</span></div>
    <div className="flex justify-between items-center mt-3 border-t pt-2">
        <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={16}/></button>
        <span className="text-[10px] uppercase font-bold text-slate-400">{order.status}</span>
        <button className="p-1 hover:bg-slate-100 rounded text-blue-600"><ChevronRight size={16}/></button>
    </div>
  </div>
);
`);

writeFile('components/kanban/Board.tsx', `
"use client";
import React, { useState } from "react";
import { Order, OrderStatus } from "@/types";
import { OrderCard } from "./OrderCard";
const COLUMNS: { id: OrderStatus; label: string }[] = [{id:"new",label:"New"},{id:"washing",label:"Washing"},{id:"drying",label:"Drying"},{id:"folding",label:"Folding"},{id:"ready",label:"Ready"}];
const MOCK_ORDERS: Order[] = [{ id: "1", storeId: "1", customerName: "Sarah Connor", status: "washing", type: "pickup", totalPrice: 25.50, createdAt: Date.now(), address: "123 Main" }];
export default function KanbanBoard() {
  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4 snap-x">
      {COLUMNS.map((col) => (
        <div key={col.id} className="snap-center min-w-[280px] flex flex-col bg-slate-100 rounded-xl h-full">
          <div className="p-3 border-b border-slate-200 font-bold text-xs uppercase text-slate-500">{col.label}</div>
          <div className="p-2 flex-1 overflow-y-auto">
            {MOCK_ORDERS.filter(o => o.status === col.id).map(o => <OrderCard key={o.id} order={o} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
`);

writeFile('app/(dashboard)/layout.tsx', `
"use client";
import Link from "next/link";
import { Hexagon, LayoutDashboard, Truck } from "lucide-react";
import { StoreProvider } from "@/lib/store-context";
export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <div className="flex min-h-screen bg-slate-50">
        <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
           <div className="h-16 flex items-center px-6 gap-2 font-bold border-b border-slate-800">
             <Hexagon className="text-hive-primary fill-hive-primary" /> Laundry<span className="text-hive-primary">Hive</span>
           </div>
           <nav className="p-4 space-y-2">
             <Link href="/dashboard/kanban" className="flex gap-3 px-3 py-2 text-hive-primary bg-slate-800 rounded-lg text-sm font-bold"><LayoutDashboard size={18} /> Ops Board</Link>
             <Link href="/dashboard/drivers" className="flex gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-bold"><Truck size={18} /> Drivers</Link>
           </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col h-screen">{children}</main>
      </div>
    </StoreProvider>
  );
}
`);
writeFile('app/(dashboard)/dashboard/kanban/page.tsx', `import Board from "@/components/kanban/Board"; export default function Page() { return <Board />; }`);
writeFile('app/(dashboard)/dashboard/drivers/page.tsx', `export default function DriverPage() { return <div>Driver Hub</div>; }`);

writeFile('app/[storeSlug]/layout.tsx', `
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
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`);

writeFile('tailwind.config.ts', `
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { primary: "var(--brand-primary)", secondary: "var(--brand-secondary)" },
        hive: { primary: "#f59e0b", dark: "#0f172a", light: "#f8fafc", accent: "#fbbf24" }
      },
    },
  },
  plugins: [],
};
export default config;
`);

writeFile('postcss.config.mjs', `
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
export default config;
`);

// 3. APP STRUCTURE & STYLES
writeFile('app/globals.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;
:root { --brand-primary: #f59e0b; --brand-secondary: #0f172a; }
body { @apply bg-slate-50 text-slate-900; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`);

writeFile('app/layout.tsx', `
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "The Laundry Hive", description: "Operator-First SaaS" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
`);

// 4. THE LANDING PAGE (CLEAN VERSION)
writeFile('app/page.tsx', `
"use client";
import Link from "next/link";
import { Hexagon, ArrowRight, CheckCircle, Star } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-hive-dark text-hive-light flex flex-col relative overflow-hidden">
      <nav className="relative z-20 max-w-7xl mx-auto w-full p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Hexagon className="text-hive-primary fill-hive-primary" size={32} />
          <span className="text-2xl font-extrabold tracking-tight">The<span className="text-hive-primary">Laundry</span>Hive</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/dashboard/kanban" className="hover:text-hive-primary text-sm font-semibold">Operator Login</Link>
          <Link href="/sparkle-wash" className="px-5 py-2 rounded-full bg-hive-primary text-hive-dark font-bold hover:brightness-110 transition">Demo Store</Link>
        </div>
      </nav>
      <section className="relative z-10 text-center max-w-5xl mx-auto pt-28 pb-40 px-6">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 blur-[130px] w-[200px] h-[200px] rounded-full bg-hive-primary/10 pointer-events-none"></div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-tight text-white">The All-In-One OS <span className="block text-hive-primary">For Modern Laundromats</span></h1>
        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">Finally — a clean, simple operating system for laundromat owners.</p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/dashboard/kanban" className="bg-hive-primary text-hive-dark px-10 py-4 rounded-full font-extrabold text-lg shadow-xl hover:scale-[1.03] transition-all flex items-center gap-2">Start Free Trial <ArrowRight /></Link>
        </div>
      </section>
    </div>
  );
}
`);

// 5. TYPES & MOCK DATABASE
writeFile('types/index.ts', `
export type OrderStatus = 'new' | 'washing' | 'drying' | 'folding' | 'ready' | 'out_for_delivery' | 'completed';
export interface Order { id: string; storeId: string; customerName: string; status: OrderStatus; type: 'pickup' | 'dropoff'; totalPrice: number; createdAt: number; address: string; }
export interface Store { id: string; slug: string; branding: { primaryColor: string; storeName: string; }; }
`);

writeFile('lib/firebase/config.ts', `
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = { apiKey: "DEMO", authDomain: "demo", projectId: "demo" };
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
`);

writeFile('lib/store-context.tsx', `
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Store } from "@/types";
const StoreContext = createContext<{ store: Store | null }>({ store: null });
export const useStore = () => useContext(StoreContext);
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Store | null>(null);
  useEffect(() => { setStore({ id: "1", slug: "sparkle-wash", branding: { primaryColor: "#2563eb", storeName: "Sparkle Wash" }}); }, []);
  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
};
`);

// 6. DASHBOARD COMPONENTS
writeFile('components/kanban/OrderCard.tsx', `
import React from "react";
import { Order } from "@/types";
import { ChevronRight, ChevronLeft } from "lucide-react";
export const OrderCard = ({ order }: { order: Order }) => (
  <div className="bg-white p-4 rounded-lg shadow border border-slate-200 mb-3">
    <div className="flex justify-between"><span className="font-bold text-slate-900">{order.customerName}</span></div>
    <div className="flex justify-between items-center mt-3 border-t pt-2">
        <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={16}/></button>
        <span className="text-[10px] uppercase font-bold text-slate-400">{order.status}</span>
        <button className="p-1 hover:bg-slate-100 rounded text-blue-600"><ChevronRight size={16}/></button>
    </div>
  </div>
);
`);

writeFile('components/kanban/Board.tsx', `
"use client";
import React, { useState } from "react";
import { Order, OrderStatus } from "@/types";
import { OrderCard } from "./OrderCard";
const COLUMNS: { id: OrderStatus; label: string }[] = [{id:"new",label:"New"},{id:"washing",label:"Washing"},{id:"drying",label:"Drying"},{id:"folding",label:"Folding"},{id:"ready",label:"Ready"}];
const MOCK_ORDERS: Order[] = [{ id: "1", storeId: "1", customerName: "Sarah Connor", status: "washing", type: "pickup", totalPrice: 25.50, createdAt: Date.now(), address: "123 Main" }];
export default function KanbanBoard() {
  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4 snap-x">
      {COLUMNS.map((col) => (
        <div key={col.id} className="snap-center min-w-[280px] flex flex-col bg-slate-100 rounded-xl h-full">
          <div className="p-3 border-b border-slate-200 font-bold text-xs uppercase text-slate-500">{col.label}</div>
          <div className="p-2 flex-1 overflow-y-auto">
            {MOCK_ORDERS.filter(o => o.status === col.id).map(o => <OrderCard key={o.id} order={o} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
`);

writeFile('app/(dashboard)/layout.tsx', `
"use client";
import Link from "next/link";
import { Hexagon, LayoutDashboard, Truck } from "lucide-react";
import { StoreProvider } from "@/lib/store-context";
export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <div className="flex min-h-screen bg-slate-50">
        <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
           <div className="h-16 flex items-center px-6 gap-2 font-bold border-b border-slate-800">
             <Hexagon className="text-hive-primary fill-hive-primary" /> Laundry<span className="text-hive-primary">Hive</span>
           </div>
           <nav className="p-4 space-y-2">
             <Link href="/dashboard/kanban" className="flex gap-3 px-3 py-2 text-hive-primary bg-slate-800 rounded-lg text-sm font-bold"><LayoutDashboard size={18} /> Ops Board</Link>
             <Link href="/dashboard/drivers" className="flex gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-bold"><Truck size={18} /> Drivers</Link>
           </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col h-screen">{children}</main>
      </div>
    </StoreProvider>
  );
}
`);
writeFile('app/(dashboard)/dashboard/kanban/page.tsx', `import Board from "@/components/kanban/Board"; export default function Page() { return <Board />; }`);
writeFile('app/(dashboard)/dashboard/drivers/page.tsx', `export default function DriverPage() { return <div>Driver Hub</div>; }`);

writeFile('app/[storeSlug]/layout.tsx', `
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
`);
writeFile('app/[storeSlug]/page.tsx', `export default function StoreHome({ params }: { params: { storeSlug: string } }) { return <div>Welcome to {params.storeSlug}</div>; }`);
writeFile('app/[storeSlug]/book/page.tsx', `export default function Book() { return <div>Booking Wizard</div>; }`);

console.log("✅ GOLDEN INSTALL COMPLETE.");
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "The Laundry Hive",
  description: "Operator-First SaaS",
  manifest: "/manifest.json",
  themeColor: "#f59e0b",
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover",
};
import InstallPrompt from "@/components/pwa/InstallPrompt";
import CookieBanner from "@/components/legal/CookieBanner";

import { StoreProvider } from "@/lib/store-context";

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <StoreProvider>
            {children}
            <InstallPrompt />
            <CookieBanner />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
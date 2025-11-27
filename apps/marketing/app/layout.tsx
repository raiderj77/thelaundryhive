import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-display",
    weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-body",
    weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
    title: "The Laundry Hive | #1 Affordable Laundry Pickup & Delivery Software",
    description: "Affordable laundry management software starting at $49/mo. QR tracking, route optimization, SMS notifications, white-label branding.",
    keywords: "laundry pickup and delivery software, laundromat POS system, wash and fold software, laundry management app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} ${dmSans.variable}`}>{children}</body>
        </html>
    );
}

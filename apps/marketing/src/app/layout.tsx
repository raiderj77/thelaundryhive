import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Laundry Pickup & Delivery Software | The Laundry Hive',
  description: 'Manage your laundry business with ease. 0% commission, $49/mo flat fee. Real-time tracking and route optimization.',
  metadataBase: new URL('https://thelaundryhive.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

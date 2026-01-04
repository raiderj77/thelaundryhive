import Link from 'next/link';

const Header = () => {
  // Use the production-ready env variable for the dashboard redirect
  const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.thelaundryhive.com';

  return (
    <header className="flex justify-between items-center p-6 border-b">
      <div className="text-2xl font-bold text-blue-600">The Laundry Hive</div>
      
      <nav className="hidden md:flex gap-8">
        <Link href="/features" className="hover:text-blue-600">Features</Link>
        <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
        <Link href="/about" className="hover:text-blue-600">About</Link>
      </nav>

      <div className="flex gap-4 items-center">
        {/* Fixes the "Missing Login" issue */}
        <a href={`${DASHBOARD_URL}/login`} className="text-sm font-medium hover:underline">
          Sign In
        </a>
        <a 
          href={`${DASHBOARD_URL}/sign-up`} 
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Start Free Trial
        </a>
      </div>
    </header>
  );
};

export default Header;

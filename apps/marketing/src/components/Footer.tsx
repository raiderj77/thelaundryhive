const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="mailto:support@thelaundryhive.com">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {/* Directly linking to the public/legal files we created */}
            <li><a href="/legal/privacy.html" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="/legal/terms.html" className="hover:text-blue-600">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 text-center text-sm text-gray-400">
        © 2025 The Laundry Hive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

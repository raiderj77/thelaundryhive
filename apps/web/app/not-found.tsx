import Link from "next/link";
import { WashingMachine } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center p-4">
            <div className="bg-slate-800 p-8 rounded-full mb-8 animate-bounce">
                <WashingMachine size={64} className="text-hive-primary" />
            </div>
            <h1 className="text-6xl font-black text-white mb-4">404</h1>
            <h2 className="text-2xl font-bold text-slate-300 mb-8">Lost in the Laundry?</h2>
            <p className="text-slate-400 max-w-md mb-8">
                The page you're looking for might have been spun away or doesn't exist.
            </p>
            <Link
                href="/"
                className="px-8 py-3 bg-hive-primary text-slate-900 font-bold rounded-full hover:brightness-110 transition-all"
            >
                Back to Home
            </Link>
        </div>
    );
}

import { Link } from '@inertiajs/react';
import { Heart } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-600 via-rose-500 to-amber-500 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            </div>
            
            <div className="relative z-10 w-full max-w-md px-4">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Heart className="h-10 w-10 text-white" fill="white" />
                        </div>
                    </Link>
                    <h1 className="mt-4 text-2xl font-bold text-white">Girl Child Hygiene</h1>
                    <p className="text-white/80 text-sm">Empowering Girls Through Education</p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {children}
                </div>

                <div className="text-center mt-6">
                    <Link href="/" className="text-white/80 hover:text-white text-sm transition">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

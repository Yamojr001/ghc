import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';

export default function PublicLayout({ children }) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Programs', href: '/programs' },
        { name: 'Donors', href: '/donors' },
        { name: 'Media', href: '/media' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    const aboutItems = [
        { name: 'About Us', href: '/about' },
        { name: 'Transparency', href: '/transparency' },
        { name: 'Our Team', href: '/team' },
    ];

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-white shadow-sm border-b border-gray-100">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2">
                                <Heart className="h-8 w-8 text-rose-600" />
                                <span className="text-xl font-bold text-gray-900">Girl Child Hygiene</span>
                            </Link>
                        </div>

                        <div className="hidden md:flex md:items-center md:space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-rose-600 px-3 py-2 text-sm font-medium">
                                Home
                            </Link>
                            
                            <div className="relative" onMouseEnter={() => setAboutDropdownOpen(true)} onMouseLeave={() => setAboutDropdownOpen(false)}>
                                <button className="flex items-center text-gray-700 hover:text-rose-600 px-3 py-2 text-sm font-medium">
                                    About <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                                {aboutDropdownOpen && (
                                    <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        {aboutItems.map((item) => (
                                            <Link key={item.name} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {navigation.slice(1).map((item) => (
                                <Link key={item.name} href={item.href} className="text-gray-700 hover:text-rose-600 px-3 py-2 text-sm font-medium">
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="hidden md:flex md:items-center md:space-x-4">
                            {auth?.user ? (
                                <Link href="/dashboard" className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-700">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-700 hover:text-rose-600 px-3 py-2 text-sm font-medium">
                                        Login
                                    </Link>
                                    <Link href="/donate" className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-700">
                                        Donate Now
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700">
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t">
                            <div className="space-y-2">
                                <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-rose-50 rounded-lg">Home</Link>
                                {aboutItems.map((item) => (
                                    <Link key={item.name} href={item.href} className="block px-3 py-2 text-gray-700 hover:bg-rose-50 rounded-lg">
                                        {item.name}
                                    </Link>
                                ))}
                                {navigation.slice(1).map((item) => (
                                    <Link key={item.name} href={item.href} className="block px-3 py-2 text-gray-700 hover:bg-rose-50 rounded-lg">
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t space-y-2">
                                    {auth?.user ? (
                                        <Link href="/dashboard" className="block w-full text-center bg-rose-600 text-white px-4 py-2 rounded-lg">Dashboard</Link>
                                    ) : (
                                        <>
                                            <Link href="/login" className="block px-3 py-2 text-gray-700 hover:bg-rose-50 rounded-lg">Login</Link>
                                            <Link href="/donate" className="block w-full text-center bg-rose-600 text-white px-4 py-2 rounded-lg">Donate Now</Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            <main>{children}</main>

            <footer className="bg-gray-900 text-white mt-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Heart className="h-6 w-6 text-rose-500" />
                                <span className="text-lg font-bold">Girl Child Hygiene</span>
                            </div>
                            <p className="text-gray-400 text-sm">Empowering girls through hygiene education and essential supplies.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                                <li><Link href="/programs" className="hover:text-white">Our Programs</Link></li>
                                <li><Link href="/transparency" className="hover:text-white">Transparency</Link></li>
                                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Get Involved</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
                                <li><Link href="/volunteer" className="hover:text-white">Volunteer</Link></li>
                                <li><Link href="/partners" className="hover:text-white">Partner With Us</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Contact Info</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>Email: info@girlchildhygiene.org</li>
                                <li>Phone: +234 XXX XXX XXXX</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
                        <p>&copy; {new Date().getFullYear()} Girl Child Hygiene Foundation. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

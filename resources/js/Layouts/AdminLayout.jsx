import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    LayoutDashboard, Users, Heart, Package, FileText, Image, MessageSquare,
    Settings, LogOut, Menu, X, ChevronDown, MapPin, DollarSign, Handshake,
    UserCheck, Award, HelpCircle, Bell, Mail
} from 'lucide-react';

export default function AdminLayout({ children, header }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (name) => {
        setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        {
            name: 'Content',
            icon: FileText,
            children: [
                { name: 'Blog Posts', href: '/admin/blog-posts' },
                { name: 'Gallery', href: '/admin/gallery' },
                { name: 'FAQs', href: '/admin/faqs' },
                { name: 'Testimonials', href: '/admin/testimonials' },
            ]
        },
        {
            name: 'Operations',
            icon: Package,
            children: [
                { name: 'Distributions', href: '/admin/distributions' },
                { name: 'Programs', href: '/admin/programs' },
                { name: 'Impact Reports', href: '/admin/impact-reports' },
            ]
        },
        {
            name: 'Donations',
            icon: DollarSign,
            children: [
                { name: 'All Donations', href: '/admin/donations' },
                { name: 'Expenses', href: '/admin/expenses' },
            ]
        },
        {
            name: 'People',
            icon: Users,
            children: [
                { name: 'Team Members', href: '/admin/team-members' },
                { name: 'Volunteers', href: '/admin/volunteers' },
                { name: 'Partners', href: '/admin/partners' },
            ]
        },
        {
            name: 'Communications',
            icon: Mail,
            children: [
                { name: 'Contact Messages', href: '/admin/contact-messages' },
                { name: 'Subscribers', href: '/admin/subscribers' },
            ]
        },
        { name: 'User Management', href: '/admin/users', icon: UserCheck },
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const NavItem = ({ item, mobile = false }) => {
        if (item.children) {
            const isOpen = openMenus[item.name];
            return (
                <div>
                    <button
                        onClick={() => toggleMenu(item.name)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <div className="flex items-center">
                            <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                            {item.name}
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                        <div className="ml-8 mt-1 space-y-1">
                            {item.children.map((child) => (
                                <Link
                                    key={child.name}
                                    href={child.href}
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
            >
                <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                {item.name}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <Heart className="h-8 w-8 text-rose-600" />
                        <span className="ml-2 text-xl font-bold text-gray-900">Admin Panel</span>
                    </div>
                    <nav className="mt-8 flex-1 px-4 space-y-1">
                        {navigation.map((item) => (
                            <NavItem key={item.name} item={item} />
                        ))}
                    </nav>
                    <div className="px-4 py-4 border-t">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-medium">
                                    {auth?.user?.name?.charAt(0)?.toUpperCase()}
                                </div>
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-700">{auth?.user?.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{auth?.user?.role}</p>
                            </div>
                            <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-gray-700">
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center">
                        <Heart className="h-8 w-8 text-rose-600" />
                        <span className="ml-2 text-lg font-bold">Admin</span>
                    </div>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
                        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-30 bg-gray-600 bg-opacity-50" onClick={() => setSidebarOpen(false)}>
                    <div className="fixed inset-y-0 left-0 w-64 bg-white pt-16 pb-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <nav className="px-4 space-y-1">
                            {navigation.map((item) => (
                                <NavItem key={item.name} item={item} mobile />
                            ))}
                        </nav>
                        <div className="px-4 py-4 mt-4 border-t">
                            <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                                <LogOut className="h-5 w-5 mr-3" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="lg:pl-64">
                <main className="py-6 lg:py-8 pt-16 lg:pt-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {header && (
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
                            </div>
                        )}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

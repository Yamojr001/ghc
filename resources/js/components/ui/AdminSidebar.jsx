// resources/js/Components/AdminSidebar.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
// You can install icons using `npm install lucide-react`
import { Home, Package, Users, Settings } from 'lucide-react'; 

// Define your navigation links
const navLinks = [
    { name: 'Dashboard', href: route('dashboard'), icon: Home },
    { name: 'Products', href: route('products.index'), icon: Package },
    { name: 'Users', href: route('users.index'), icon: Users },
    { name: 'Settings', href: route('settings.index'), icon: Settings },
];

const AdminSidebar = () => {
    // Get the current URL for highlighting the active link
    const currentUrl = route(route().current());

    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 shadow-lg">
            <div className="py-4 text-gray-500 dark:text-gray-400">
                
                {/* Logo / Title */}
                <Link
                    href="/"
                    className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                >
                    Admin Panel
                </Link>

                {/* Navigation Links */}
                <ul className="mt-6">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = link.href === currentUrl;
                        
                        return (
                            <li className="relative px-6 py-3" key={link.name}>
                                {/* Active Link Indicator */}
                                {isActive && (
                                    <span className="absolute inset-y-0 left-0 w-1 bg-indigo-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                                )}
                                
                                {/* The Link itself */}
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",
                                        isActive ? "text-gray-800 dark:text-gray-100" : ""
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="ml-4">{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default AdminSidebar;
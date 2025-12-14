// resources/js/Components/AdminHeader.jsx

import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Link, usePage } from '@inertiajs/react';
import { LogOut, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminHeader = ({ user }) => {
    // Fallback for user data
    const { auth } = usePage().props;
    const currentUser = user || auth.user;

    return (
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
            <div className="container flex items-center justify-between h-full px-6 mx-auto">
                
                {/* Mobile Menu Button (you'd need state to handle this, omitted for brevity) */}
                <button className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple" aria-label="Menu">
                    <Menu className="w-6 h-6" />
                </button>

                {/* Search / Center Content (optional) */}
                <div className="flex-1">
                    {/* Placeholder for Search Bar or Notifications */}
                </div>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                            {/* Simple User Icon or Avatar */}
                            <User className="w-5 h-5 text-gray-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('profile.edit')}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            {/* Note: Inertia logout is a POST request */}
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button" 
                                className="w-full text-left" // Ensure button fills dropdown width
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default AdminHeader;
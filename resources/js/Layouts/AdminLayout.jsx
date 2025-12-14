// resources/js/Layouts/AdminLayout.jsx

import React from 'react';
import { usePage } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader'; // To be created
import AdminSidebar from '@/Components/AdminSidebar'; // To be created

const AdminLayout = ({ user, children }) => {
    // We get global Inertia props, like the current user, from the usePage hook.
    // user prop is passed explicitly from the Inertia shared data (or a base controller)

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* 1. Sidebar Component (Always visible) */}
            <AdminSidebar />

            {/* 2. Main Content Area */}
            <div className="flex flex-col flex-1 w-full overflow-y-auto">
                
                {/* 3. Header/Navbar */}
                <AdminHeader user={user} />

                {/* 4. Page Content (The actual view) */}
                <main className="h-full p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
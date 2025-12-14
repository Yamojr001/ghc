// resources/js/Pages/Dashboard.jsx

import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Dashboard({ auth }) { // auth prop is passed by Breeze's handler
    return (
        // The Head component updates the <title> tag
        <AdminLayout user={auth.user}> 
            <Head title="Dashboard" />

            {/* The actual page content */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
                Admin Dashboard
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Sales</CardTitle>
                    </CardHeader>
                    <CardContent>$12,450</CardContent>
                </Card>
                {/* ... other cards ... */}
            </div>
        </AdminLayout>
    );
}
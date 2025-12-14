import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Package, Users, Clock, CheckCircle, Plus, MapPin } from 'lucide-react';

export default function StaffDashboard({ stats, recentDistributions }) {
    const statCards = [
        { title: 'My Distributions', value: stats?.myDistributions || 0, icon: Package, color: 'bg-purple-100 text-purple-600' },
        { title: 'Pending Approval', value: stats?.pendingDistributions || 0, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
        { title: 'Approved', value: stats?.approvedDistributions || 0, icon: CheckCircle, color: 'bg-green-100 text-green-600' },
        { title: 'Total Beneficiaries', value: stats?.totalBeneficiaries || 0, icon: Users, color: 'bg-blue-100 text-blue-600' },
    ];

    return (
        <AdminLayout header="Staff Dashboard">
            <Head title="Staff Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
                    </div>
                    <div className="space-y-3">
                        <Link href="/staff/distributions/create" className="flex items-center p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition">
                            <div className="p-3 bg-rose-100 rounded-lg mr-4">
                                <Plus className="h-6 w-6 text-rose-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Add New Distribution</p>
                                <p className="text-sm text-gray-600">Record a new distribution activity</p>
                            </div>
                        </Link>
                        <Link href="/staff/distributions" className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                            <div className="p-3 bg-gray-100 rounded-lg mr-4">
                                <Package className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">View My Distributions</p>
                                <p className="text-sm text-gray-600">See all your distribution records</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Distributions</h2>
                        <Link href="/staff/distributions" className="text-rose-600 text-sm font-medium hover:text-rose-700">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {(recentDistributions || []).map((dist) => (
                            <div key={dist.id} className="flex items-center justify-between py-3 border-b last:border-0">
                                <div className="flex items-center">
                                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                                        <MapPin className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{dist.location_name}</p>
                                        <p className="text-sm text-gray-500">{dist.state}, {dist.local_government}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-900">{dist.beneficiary_count} beneficiaries</p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${dist.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {dist.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {(!recentDistributions || recentDistributions.length === 0) && (
                            <p className="text-gray-500 text-center py-4">No distributions yet</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

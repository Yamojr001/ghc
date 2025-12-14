import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    Users, DollarSign, Package, Heart, TrendingUp, MapPin, 
    FileText, Image, Calendar, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

export default function Dashboard({ stats }) {
    const statCards = [
        { 
            title: 'Total Donations', 
            value: `$${(stats?.totalDonations || 0).toLocaleString()}`, 
            icon: DollarSign, 
            color: 'green',
            change: '+12%',
            changeType: 'increase'
        },
        { 
            title: 'Beneficiaries Reached', 
            value: (stats?.totalBeneficiaries || 0).toLocaleString(), 
            icon: Users, 
            color: 'blue',
            change: '+8%',
            changeType: 'increase'
        },
        { 
            title: 'Distributions', 
            value: stats?.totalDistributions || 0, 
            icon: Package, 
            color: 'purple',
            change: '+5',
            changeType: 'increase'
        },
        { 
            title: 'Active Programs', 
            value: stats?.activePrograms || 0, 
            icon: Heart, 
            color: 'rose',
            change: '0',
            changeType: 'neutral'
        },
    ];

    const colorClasses = {
        green: 'bg-green-50 text-green-600',
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        rose: 'bg-rose-50 text-rose-600',
    };

    return (
        <AdminLayout header="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            {stat.changeType === 'increase' && (
                                <span className="flex items-center text-sm text-green-600">
                                    <ArrowUpRight className="h-4 w-4" />
                                    {stat.change}
                                </span>
                            )}
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Distributions</h2>
                        <Link href="/admin/distributions" className="text-rose-600 text-sm font-medium hover:text-rose-700">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {(stats?.recentDistributions || []).slice(0, 5).map((dist) => (
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
                                    <p className="text-sm text-gray-500">
                                        {new Date(dist.distribution_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {(!stats?.recentDistributions || stats.recentDistributions.length === 0) && (
                            <p className="text-gray-500 text-center py-4">No distributions yet</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recent Donations</h2>
                        <Link href="/admin/donations" className="text-rose-600 text-sm font-medium hover:text-rose-700">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {(stats?.recentDonations || []).slice(0, 5).map((donation) => (
                            <div key={donation.id} className="flex items-center justify-between py-3 border-b last:border-0">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                                        <DollarSign className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {donation.is_anonymous ? 'Anonymous' : donation.donor_name}
                                        </p>
                                        <p className="text-sm text-gray-500">{donation.donor_country || 'Unknown'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-green-600">
                                        ${(donation.amount_usd || donation.amount || 0).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(donation.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {(!stats?.recentDonations || stats.recentDonations.length === 0) && (
                            <p className="text-gray-500 text-center py-4">No donations yet</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link href="/admin/distributions/create" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <Package className="h-5 w-5 text-purple-600 mr-3" />
                            <span className="text-sm font-medium">New Distribution</span>
                        </Link>
                        <Link href="/admin/blog-posts/create" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <FileText className="h-5 w-5 text-blue-600 mr-3" />
                            <span className="text-sm font-medium">Create Blog Post</span>
                        </Link>
                        <Link href="/admin/gallery/create" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <Image className="h-5 w-5 text-green-600 mr-3" />
                            <span className="text-sm font-medium">Add Gallery Item</span>
                        </Link>
                        <Link href="/admin/users/create" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <Users className="h-5 w-5 text-rose-600 mr-3" />
                            <span className="text-sm font-medium">Add New User</span>
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Content Overview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">{stats?.blogPosts || 0}</p>
                            <p className="text-sm text-gray-600">Blog Posts</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">{stats?.galleryItems || 0}</p>
                            <p className="text-sm text-gray-600">Gallery Items</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">{stats?.volunteers || 0}</p>
                            <p className="text-sm text-gray-600">Volunteers</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">{stats?.partners || 0}</p>
                            <p className="text-sm text-gray-600">Partners</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

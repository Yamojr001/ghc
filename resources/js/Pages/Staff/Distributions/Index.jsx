import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, MapPin, Calendar, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function StaffDistributionsIndex({ distributions }) {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-700',
        approved: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
    };

    const statusIcons = {
        pending: Clock,
        approved: CheckCircle,
        rejected: XCircle,
    };

    return (
        <AdminLayout header="My Distributions">
            <Head title="My Distributions" />

            <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">View and manage your distribution records</p>
                <Link
                    href="/staff/distributions/create"
                    className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Distribution
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">State/LGA</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiaries</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {(distributions || []).map((dist) => {
                                const StatusIcon = statusIcons[dist.status] || Clock;
                                return (
                                    <tr key={dist.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                                <div>
                                                    <div className="font-medium text-gray-900">{dist.location_name}</div>
                                                    <div className="text-sm text-gray-500">{dist.location_type}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {dist.state}, {dist.local_government}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(dist.distribution_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                                                <Users className="h-3 w-3 mr-1" />
                                                {dist.beneficiary_count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusColors[dist.status]}`}>
                                                <StatusIcon className="h-3 w-3 mr-1" />
                                                {dist.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {(!distributions || distributions.length === 0) && (
                    <div className="text-center py-12">
                        <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No distributions yet</h3>
                        <p className="text-gray-600 mb-4">Start by recording your first distribution.</p>
                        <Link href="/staff/distributions/create" className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700">
                            <Plus className="h-5 w-5 mr-2" />
                            Add Distribution
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

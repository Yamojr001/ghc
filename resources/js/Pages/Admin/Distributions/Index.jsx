import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Eye, Edit, Trash2, MapPin, Calendar, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function DistributionsIndex({ distributions }) {
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this distribution?')) {
            router.delete(`/admin/distributions/${id}`);
        }
    };

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
        <AdminLayout header="Distributions">
            <Head title="Manage Distributions" />

            <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">Manage distribution records and evidence</p>
                <Link
                    href="/admin/distributions/create"
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Evidence</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {(distributions?.data || distributions || []).map((dist) => {
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
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {dist.items_distributed || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {dist.total_amount ? `$${parseFloat(dist.total_amount).toLocaleString()}` : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusColors[dist.status]}`}>
                                                <StatusIcon className="h-3 w-3 mr-1" />
                                                {dist.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {dist.photo_urls && dist.photo_urls.length > 0 ? (
                                                <span className="text-green-600 text-sm">{dist.photo_urls.length} photos</span>
                                            ) : (
                                                <span className="text-gray-400 text-sm">No photos</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link href={`/admin/distributions/${dist.id}`} className="inline-flex p-2 text-gray-600 hover:text-blue-600">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link href={`/admin/distributions/${dist.id}/edit`} className="inline-flex p-2 text-gray-600 hover:text-green-600">
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(dist.id)} className="inline-flex p-2 text-gray-600 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {(!distributions || (Array.isArray(distributions) ? distributions.length === 0 : distributions.data?.length === 0)) && (
                    <div className="text-center py-12">
                        <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No distributions yet</h3>
                        <p className="text-gray-600 mb-4">Get started by creating your first distribution record.</p>
                        <Link href="/admin/distributions/create" className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700">
                            <Plus className="h-5 w-5 mr-2" />
                            Add Distribution
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

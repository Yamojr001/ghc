import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DollarSign, CheckCircle, Clock, XCircle, Eye, Mail } from 'lucide-react';

export default function DonationsIndex({ donations }) {
    const handleVerify = (id) => {
        if (confirm('Mark this donation as verified?')) {
            router.put(`/admin/donations/${id}/verify`);
        }
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-700',
        verified: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
    };

    const statusIcons = {
        pending: Clock,
        verified: CheckCircle,
        rejected: XCircle,
    };

    return (
        <AdminLayout header="Donations">
            <Head title="Manage Donations" />

            <div className="mb-6">
                <p className="text-gray-600">View and manage all donations</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {(donations || []).map((donation) => {
                                const StatusIcon = statusIcons[donation.status] || Clock;
                                return (
                                    <tr key={donation.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-green-100 rounded-lg mr-3">
                                                    <DollarSign className="h-5 w-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {donation.is_anonymous ? 'Anonymous' : donation.donor_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{donation.donor_email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">
                                                ${(donation.amount_usd || donation.amount || 0).toLocaleString()}
                                            </div>
                                            {donation.currency !== 'USD' && (
                                                <div className="text-sm text-gray-500">
                                                    {donation.currency} {donation.amount}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-full text-xs capitalize">
                                                {donation.category || 'general'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                                            {donation.payment_method?.replace('_', ' ') || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(donation.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusColors[donation.status]}`}>
                                                <StatusIcon className="h-3 w-3 mr-1" />
                                                {donation.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {donation.status === 'pending' && (
                                                <button
                                                    onClick={() => handleVerify(donation.id)}
                                                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                                                >
                                                    <CheckCircle className="h-4 w-4 mr-1" />
                                                    Verify
                                                </button>
                                            )}
                                            {donation.bank_proof_url && (
                                                <a
                                                    href={donation.bank_proof_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex p-2 text-gray-600 hover:text-blue-600"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {(!donations || donations.length === 0) && (
                    <div className="text-center py-12">
                        <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No donations yet</h3>
                        <p className="text-gray-600">Donations will appear here once they are made.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

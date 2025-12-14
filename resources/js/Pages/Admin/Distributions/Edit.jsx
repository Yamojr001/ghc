import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditDistribution({ distribution, programs }) {
    const { data, setData, put, processing, errors } = useForm({
        program_id: distribution.program_id || '',
        location_name: distribution.location_name || '',
        location_type: distribution.location_type || '',
        state: distribution.state || '',
        local_government: distribution.local_government || '',
        region: distribution.region || '',
        country: distribution.country || 'Nigeria',
        beneficiary_count: distribution.beneficiary_count || '',
        items_distributed: distribution.items_distributed || '',
        total_amount: distribution.total_amount || '',
        distribution_date: distribution.distribution_date?.split('T')[0] || '',
        notes: distribution.notes || '',
        field_officer_name: distribution.field_officer_name || '',
        status: distribution.status || 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/distributions/${distribution.id}`);
    };

    return (
        <AdminLayout header="Edit Distribution">
            <Head title="Edit Distribution" />

            <div className="mb-6">
                <Link href="/admin/distributions" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Distributions
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
                <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location Name *</label>
                            <input
                                type="text"
                                value={data.location_name}
                                onChange={(e) => setData('location_name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                required
                            />
                            {errors.location_name && <p className="text-red-500 text-sm mt-1">{errors.location_name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
                            <select
                                value={data.location_type}
                                onChange={(e) => setData('location_type', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            >
                                <option value="">Select Type</option>
                                <option value="school">School</option>
                                <option value="community">Community</option>
                                <option value="health_center">Health Center</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                            <input
                                type="text"
                                value={data.state}
                                onChange={(e) => setData('state', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                required
                            />
                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Local Government *</label>
                            <input
                                type="text"
                                value={data.local_government}
                                onChange={(e) => setData('local_government', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                required
                            />
                            {errors.local_government && <p className="text-red-500 text-sm mt-1">{errors.local_government}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                        <select
                            value={data.program_id}
                            onChange={(e) => setData('program_id', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        >
                            <option value="">Select Program</option>
                            {(programs || []).map((program) => (
                                <option key={program.id} value={program.id}>{program.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Count *</label>
                            <input
                                type="number"
                                value={data.beneficiary_count}
                                onChange={(e) => setData('beneficiary_count', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                min="1"
                                required
                            />
                            {errors.beneficiary_count && <p className="text-red-500 text-sm mt-1">{errors.beneficiary_count}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Items Distributed</label>
                            <input
                                type="number"
                                value={data.items_distributed}
                                onChange={(e) => setData('items_distributed', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount ($)</label>
                            <input
                                type="number"
                                value={data.total_amount}
                                onChange={(e) => setData('total_amount', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Distribution Date *</label>
                            <input
                                type="date"
                                value={data.distribution_date}
                                onChange={(e) => setData('distribution_date', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                required
                            />
                            {errors.distribution_date && <p className="text-red-500 text-sm mt-1">{errors.distribution_date}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Field Officer</label>
                            <input
                                type="text"
                                value={data.field_officer_name}
                                onChange={(e) => setData('field_officer_name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <Link href="/admin/distributions" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {processing ? 'Saving...' : 'Update Distribution'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

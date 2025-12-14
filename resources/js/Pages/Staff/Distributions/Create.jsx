import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save } from 'lucide-react';

export default function StaffCreateDistribution({ programs }) {
    const { data, setData, post, processing, errors } = useForm({
        program_id: '',
        location_name: '',
        location_type: '',
        state: '',
        local_government: '',
        region: '',
        country: 'Nigeria',
        beneficiary_count: '',
        items_distributed: '',
        total_amount: '',
        distribution_date: '',
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/staff/distributions');
    };

    return (
        <AdminLayout header="Add Distribution">
            <Head title="Add Distribution" />

            <div className="mb-6">
                <Link href="/staff/distributions" className="inline-flex items-center text-gray-600 hover:text-gray-900">
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
                                placeholder="e.g., Government Secondary School"
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
                                placeholder="e.g., Lagos"
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
                                placeholder="e.g., Ikeja"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="Any additional notes about this distribution..."
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <Link href="/staff/distributions" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {processing ? 'Submitting...' : 'Submit for Approval'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateProgram() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        short_description: '',
        image_url: '',
        goal: '',
        required_funding: '',
        current_funding: 0,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/programs');
    };

    return (
        <AdminLayout header="Create Program">
            <Head title="Create Program" />

            <div className="mb-6">
                <Link href="/admin/programs" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Programs
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
                <div className="grid gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Program Name *</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                        <input
                            type="text"
                            value={data.short_description}
                            onChange={(e) => setData('short_description', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="Brief summary..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Description *</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            required
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
                        <input
                            type="text"
                            value={data.goal}
                            onChange={(e) => setData('goal', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="What this program aims to achieve..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Required Funding ($)</label>
                            <input
                                type="number"
                                value={data.required_funding}
                                onChange={(e) => setData('required_funding', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Funding ($)</label>
                            <input
                                type="number"
                                value={data.current_funding}
                                onChange={(e) => setData('current_funding', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <input
                            type="text"
                            value={data.image_url}
                            onChange={(e) => setData('image_url', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="https://..."
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                        />
                        <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                            Active Program
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <Link href="/admin/programs" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {processing ? 'Saving...' : 'Save Program'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

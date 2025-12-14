import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

export default function CreateGalleryItem() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        image_url: '',
        category: '',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/gallery');
    };

    return (
        <AdminLayout header="Add Gallery Item">
            <Head title="Add Gallery Item" />

            <div className="mb-6">
                <Link href="/admin/gallery" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Gallery
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
                <div className="grid gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            required
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
                        <input
                            type="text"
                            value={data.image_url}
                            onChange={(e) => setData('image_url', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="https://..."
                            required
                        />
                        {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
                        {data.image_url && (
                            <div className="mt-3 aspect-video max-w-md bg-gray-100 rounded-lg overflow-hidden">
                                <img src={data.image_url} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        >
                            <option value="">Select Category</option>
                            <option value="distributions">Distributions</option>
                            <option value="events">Events</option>
                            <option value="team">Team</option>
                            <option value="impact">Impact</option>
                        </select>
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
                            Show in gallery
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <Link href="/admin/gallery" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {processing ? 'Saving...' : 'Save Image'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

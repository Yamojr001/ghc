import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

export default function GalleryIndex({ items }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this gallery item?')) {
            router.delete(`/admin/gallery/${id}`);
        }
    };

    return (
        <AdminLayout header="Gallery">
            <Head title="Manage Gallery" />

            <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">Manage your image gallery</p>
                <Link
                    href="/admin/gallery/create"
                    className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Image
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(items || []).map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                        <div className="aspect-video relative bg-gray-100">
                            {item.image_url ? (
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="h-12 w-12 text-gray-300" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Link href={`/admin/gallery/${item.id}/edit`} className="p-2 bg-white rounded-full mx-1 hover:bg-gray-100">
                                    <Edit className="h-4 w-4 text-gray-600" />
                                </Link>
                                <button onClick={() => handleDelete(item.id)} className="p-2 bg-white rounded-full mx-1 hover:bg-gray-100">
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-500">{item.category || 'General'}</span>
                                {item.is_active ? (
                                    <span className="inline-flex items-center text-xs text-green-600">
                                        <Eye className="h-3 w-3 mr-1" />
                                        Active
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center text-xs text-gray-400">
                                        <EyeOff className="h-3 w-3 mr-1" />
                                        Hidden
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(!items || items.length === 0) && (
                <div className="text-center py-12 bg-white rounded-xl">
                    <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No gallery items yet</h3>
                    <p className="text-gray-600 mb-4">Start building your gallery by adding images.</p>
                    <Link href="/admin/gallery/create" className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700">
                        <Plus className="h-5 w-5 mr-2" />
                        Add Image
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}

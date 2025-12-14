import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, FileText, Calendar, Eye, EyeOff } from 'lucide-react';

export default function BlogPostsIndex({ posts }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            router.delete(`/admin/blog-posts/${id}`);
        }
    };

    return (
        <AdminLayout header="Blog Posts">
            <Head title="Manage Blog Posts" />

            <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">Manage your blog content</p>
                <Link
                    href="/admin/blog-posts/create"
                    className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    New Post
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {(posts || []).map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                            <div>
                                                <div className="font-medium text-gray-900">{post.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{post.category || 'General'}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{post.author || 'Admin'}</td>
                                    <td className="px-6 py-4">
                                        {post.is_published ? (
                                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                                <Eye className="h-3 w-3 mr-1" />
                                                Published
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                                <EyeOff className="h-3 w-3 mr-1" />
                                                Draft
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link href={`/admin/blog-posts/${post.id}/edit`} className="inline-flex p-2 text-gray-600 hover:text-green-600">
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                        <button onClick={() => handleDelete(post.id)} className="inline-flex p-2 text-gray-600 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!posts || posts.length === 0) && (
                    <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No blog posts yet</h3>
                        <p className="text-gray-600 mb-4">Get started by creating your first blog post.</p>
                        <Link href="/admin/blog-posts/create" className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700">
                            <Plus className="h-5 w-5 mr-2" />
                            New Post
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

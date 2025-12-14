import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateBlogPost() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        excerpt: '',
        featured_image: '',
        category: '',
        author: '',
        is_published: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/blog-posts');
    };

    return (
        <AdminLayout header="Create Blog Post">
            <Head title="Create Blog Post" />

            <div className="mb-6">
                <Link href="/admin/blog-posts" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog Posts
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                        <textarea
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="Brief summary of the post..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows={10}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            required
                        />
                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            >
                                <option value="">Select Category</option>
                                <option value="news">News</option>
                                <option value="stories">Stories</option>
                                <option value="updates">Updates</option>
                                <option value="events">Events</option>
                                <option value="education">Education</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                            <input
                                type="text"
                                value={data.author}
                                onChange={(e) => setData('author', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                        <input
                            type="text"
                            value={data.featured_image}
                            onChange={(e) => setData('featured_image', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="https://..."
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="is_published"
                            checked={data.is_published}
                            onChange={(e) => setData('is_published', e.target.checked)}
                            className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                        />
                        <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
                            Publish immediately
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <Link href="/admin/blog-posts" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {processing ? 'Saving...' : 'Save Post'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

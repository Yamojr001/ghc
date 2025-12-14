import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Calendar, User, ArrowRight, Tag, FileText } from 'lucide-react';

export default function Blog({ posts }) {
    return (
        <PublicLayout>
            <Head title="Blog - Girl Child Hygiene Foundation" />
            
            <section className="bg-gradient-to-br from-rose-600 to-rose-800 text-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-bold">Our Blog</h1>
                    <p className="mt-4 text-lg text-rose-100 max-w-2xl">
                        Stories, updates, and insights from our work empowering girls through hygiene education.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {posts && posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition">
                                    <div className="h-48 bg-rose-100">
                                        {post.featured_image ? (
                                            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FileText className="h-16 w-16 text-rose-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        {post.category && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 mb-3">
                                                <Tag className="h-3 w-3 mr-1" />
                                                {post.category}
                                            </span>
                                        )}
                                        <h2 className="text-xl font-bold text-gray-900 line-clamp-2">{post.title}</h2>
                                        <p className="mt-2 text-gray-600 line-clamp-3">{post.excerpt || post.content?.substring(0, 150)}...</p>
                                        
                                        <div className="mt-4 flex items-center text-sm text-gray-500">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                            {post.author && (
                                                <>
                                                    <span className="mx-2">•</span>
                                                    <User className="h-4 w-4 mr-1" />
                                                    {post.author}
                                                </>
                                            )}
                                        </div>

                                        <Link href={`/blog/${post.slug || post.id}`} className="inline-flex items-center mt-4 text-rose-600 font-medium hover:text-rose-700">
                                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No blog posts yet</h3>
                            <p className="text-gray-600">Check back soon for stories and updates from our programs.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Stay Updated</h2>
                    <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                        Subscribe to our newsletter to receive the latest news and updates from our programs.
                    </p>
                    <form className="mt-8 max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        />
                        <button type="submit" className="px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </PublicLayout>
    );
}

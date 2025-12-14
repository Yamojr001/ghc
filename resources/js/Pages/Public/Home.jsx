import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Heart, Users, MapPin, Package, ArrowRight, Star } from 'lucide-react';

export default function Home({ stats, programs, testimonials, recentDistributions }) {
    return (
        <PublicLayout>
            <Head title="Home - Girl Child Hygiene Foundation" />
            
            <section className="relative bg-gradient-to-br from-rose-600 to-rose-800 text-white py-20 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                Empowering Girls Through <span className="text-rose-200">Hygiene Education</span>
                            </h1>
                            <p className="mt-6 text-lg text-rose-100">
                                We provide essential hygiene supplies and education to underserved girls, 
                                helping them stay in school and reach their full potential.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link href="/donate" className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-rose-50 transition">
                                    Donate Now
                                </Link>
                                <Link href="/programs" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                                    Our Programs
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600" 
                                     alt="Children learning" 
                                     className="rounded-xl w-full h-80 object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                                <Users className="h-8 w-8 text-rose-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{stats?.beneficiaries || '10,000+'}</div>
                            <div className="text-gray-600">Girls Reached</div>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                                <MapPin className="h-8 w-8 text-rose-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{stats?.locations || '50+'}</div>
                            <div className="text-gray-600">Communities</div>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                                <Package className="h-8 w-8 text-rose-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{stats?.distributions || '200+'}</div>
                            <div className="text-gray-600">Distributions</div>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                                <Heart className="h-8 w-8 text-rose-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{stats?.donors || '500+'}</div>
                            <div className="text-gray-600">Donors</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Our Programs</h2>
                        <p className="mt-4 text-gray-600">Making a difference in the lives of young girls</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(programs || []).slice(0, 3).map((program) => (
                            <div key={program.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
                                <div className="h-48 bg-rose-100">
                                    {program.image_url ? (
                                        <img src={program.image_url} alt={program.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Heart className="h-16 w-16 text-rose-300" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
                                    <p className="mt-2 text-gray-600 line-clamp-2">{program.short_description || program.description}</p>
                                    <Link href={`/programs/${program.slug || program.id}`} className="inline-flex items-center mt-4 text-rose-600 font-medium hover:text-rose-700">
                                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link href="/programs" className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition">
                            View All Programs <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-rose-600 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold">Make a Difference Today</h2>
                    <p className="mt-4 text-rose-100 max-w-2xl mx-auto">
                        Your donation can help provide hygiene supplies and education to girls who need it most. 
                        Every contribution makes a lasting impact.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href="/donate" className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-rose-50 transition">
                            Donate Now
                        </Link>
                        <Link href="/volunteer" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                            Become a Volunteer
                        </Link>
                    </div>
                </div>
            </section>

            {testimonials && testimonials.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">What People Say</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.slice(0, 3).map((testimonial) => (
                                <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 italic">"{testimonial.content}"</p>
                                    <div className="mt-4 flex items-center">
                                        <div className="h-10 w-10 bg-rose-100 rounded-full flex items-center justify-center">
                                            <span className="text-rose-600 font-semibold">{testimonial.name?.charAt(0)}</span>
                                        </div>
                                        <div className="ml-3">
                                            <div className="font-medium text-gray-900">{testimonial.name}</div>
                                            <div className="text-sm text-gray-500">{testimonial.role || testimonial.location}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}

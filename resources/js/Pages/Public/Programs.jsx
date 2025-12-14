import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Heart, ArrowRight, Target, Users } from 'lucide-react';

export default function Programs({ programs }) {
    return (
        <PublicLayout>
            <Head title="Our Programs - Girl Child Hygiene Foundation" />
            
            <section className="bg-gradient-to-br from-rose-600 to-rose-800 text-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-bold">Our Programs</h1>
                    <p className="mt-4 text-lg text-rose-100 max-w-2xl">
                        Discover how we're making a difference in the lives of young girls through our various initiatives.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(programs || []).map((program) => (
                            <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-100">
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
                                    <h3 className="text-xl font-bold text-gray-900">{program.name}</h3>
                                    <p className="mt-2 text-gray-600 line-clamp-3">{program.short_description || program.description}</p>
                                    
                                    {(program.beneficiaries_reached || program.goal) && (
                                        <div className="mt-4 flex items-center gap-4 text-sm">
                                            {program.beneficiaries_reached && (
                                                <div className="flex items-center text-gray-600">
                                                    <Users className="h-4 w-4 mr-1 text-rose-500" />
                                                    {program.beneficiaries_reached} reached
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {program.required_funding && program.current_funding && (
                                        <div className="mt-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">Progress</span>
                                                <span className="font-medium text-rose-600">
                                                    {Math.round((program.current_funding / program.required_funding) * 100)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-rose-600 h-2 rounded-full" 
                                                    style={{ width: `${Math.min((program.current_funding / program.required_funding) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-6 flex items-center justify-between">
                                        <Link href={`/programs/${program.slug || program.id}`} className="inline-flex items-center text-rose-600 font-medium hover:text-rose-700">
                                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                        <Link href="/donate" className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700">
                                            Support
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {(!programs || programs.length === 0) && (
                        <div className="text-center py-12">
                            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No programs yet</h3>
                            <p className="text-gray-600">Check back soon for our upcoming initiatives.</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

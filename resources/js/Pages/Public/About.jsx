import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Heart, Target, Eye, Users, Award } from 'lucide-react';

export default function About({ teamMembers }) {
    return (
        <PublicLayout>
            <Head title="About Us - Girl Child Hygiene Foundation" />
            
            <section className="bg-gradient-to-br from-rose-600 to-rose-800 text-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-bold">About Us</h1>
                    <p className="mt-4 text-lg text-rose-100 max-w-2xl">
                        Learn about our mission, vision, and the team behind Girl Child Hygiene Foundation.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                            <p className="mt-4 text-gray-600">
                                Girl Child Hygiene Foundation was founded with a simple yet powerful mission: 
                                to ensure that every girl has access to essential hygiene products and education, 
                                enabling them to stay in school and thrive.
                            </p>
                            <p className="mt-4 text-gray-600">
                                We believe that menstrual hygiene should never be a barrier to education. 
                                Through our programs, we provide sanitary products, hygiene education, 
                                and support to underserved communities across Nigeria.
                            </p>
                        </div>
                        <div className="bg-rose-50 rounded-2xl p-8">
                            <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600" 
                                 alt="Our team" 
                                 className="rounded-xl w-full h-64 object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-100 rounded-lg mb-4">
                                <Target className="h-6 w-6 text-rose-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                            <p className="mt-4 text-gray-600">
                                To empower girls through access to menstrual hygiene products, comprehensive 
                                health education, and community support systems, ensuring no girl misses school 
                                due to her period.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-8 shadow-sm">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-100 rounded-lg mb-4">
                                <Eye className="h-6 w-6 text-rose-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                            <p className="mt-4 text-gray-600">
                                A world where every girl can manage her menstrual health with dignity, 
                                has access to education without interruption, and is empowered to reach 
                                her full potential.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Dignity', desc: 'Every girl deserves to manage her health with dignity' },
                            { title: 'Education', desc: 'Knowledge empowers girls to make informed decisions' },
                            { title: 'Accessibility', desc: 'Hygiene products should be available to all' },
                            { title: 'Community', desc: 'Together we create lasting change' },
                        ].map((value, index) => (
                            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-600 rounded-full mb-4">
                                    <Heart className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900">{value.title}</h3>
                                <p className="mt-2 text-sm text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {teamMembers && teamMembers.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.id} className="bg-white rounded-xl p-6 text-center shadow-sm">
                                    <div className="w-24 h-24 bg-rose-100 rounded-full mx-auto mb-4 overflow-hidden">
                                        {member.photo_url ? (
                                            <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Users className="h-12 w-12 text-rose-300" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-rose-600 text-sm">{member.position}</p>
                                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-16 bg-rose-600 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold">Join Our Mission</h2>
                    <p className="mt-4 text-rose-100 max-w-2xl mx-auto">
                        Whether through donations, volunteering, or partnerships, you can help us 
                        make a lasting impact on the lives of young girls.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href="/donate" className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-rose-50 transition">
                            Donate Now
                        </Link>
                        <Link href="/transparency" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                            View Transparency Report
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

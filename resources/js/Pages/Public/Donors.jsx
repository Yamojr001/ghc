import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Heart, Award, DollarSign, Users, Star } from 'lucide-react';

export default function Donors({ donors, topDonors, donationStats }) {
    return (
        <PublicLayout>
            <Head title="Our Donors - Girl Child Hygiene Foundation" />
            
            <section className="bg-gradient-to-br from-rose-600 to-rose-800 text-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-bold">Our Donors</h1>
                    <p className="mt-4 text-lg text-rose-100 max-w-2xl">
                        Meet the generous individuals and organizations making our mission possible.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Thank You to Our Supporters</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Every donation, big or small, helps us reach more girls and make a lasting impact.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center">
                            <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">Gold Donors</h3>
                            <p className="text-3xl font-bold text-yellow-600 mt-2">{donationStats?.gold || 0}</p>
                            <p className="text-sm text-gray-600">$1,000+</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center">
                            <Award className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">Silver Donors</h3>
                            <p className="text-3xl font-bold text-gray-600 mt-2">{donationStats?.silver || 0}</p>
                            <p className="text-sm text-gray-600">$500 - $999</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                            <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">Bronze Donors</h3>
                            <p className="text-3xl font-bold text-orange-600 mt-2">{donationStats?.bronze || 0}</p>
                            <p className="text-sm text-gray-600">$100 - $499</p>
                        </div>
                    </div>

                    {topDonors && topDonors.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Contributors</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {topDonors.filter(d => !d.is_anonymous).map((donor, index) => (
                                    <div key={donor.id || index} className="bg-gray-50 rounded-xl p-6 text-center">
                                        <div className="w-16 h-16 bg-rose-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                            {index < 3 ? (
                                                <Star className="h-8 w-8 text-yellow-500 fill-current" />
                                            ) : (
                                                <Heart className="h-8 w-8 text-rose-500" />
                                            )}
                                        </div>
                                        <h4 className="font-bold text-gray-900">{donor.donor_name}</h4>
                                        <p className="text-sm text-gray-600">{donor.donor_country || 'Anonymous Location'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-gray-50 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Donations</h3>
                        <div className="space-y-4">
                            {(donors || []).slice(0, 10).map((donation, index) => (
                                <div key={donation.id || index} className="flex items-center justify-between bg-white rounded-lg p-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                                            <Heart className="h-5 w-5 text-rose-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {donation.is_anonymous ? 'Anonymous Donor' : donation.donor_name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(donation.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-rose-600">
                                            ${(donation.amount_usd || donation.amount || 0).toLocaleString()}
                                        </p>
                                        {donation.message && (
                                            <p className="text-sm text-gray-500 max-w-xs truncate">{donation.message}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-rose-600 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold">Join Our Donor Community</h2>
                    <p className="mt-4 text-rose-100 max-w-2xl mx-auto">
                        Your contribution can change lives. Every donation helps us provide essential hygiene products to girls in need.
                    </p>
                    <div className="mt-8">
                        <Link href="/donate" className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-rose-50 transition">
                            Make a Donation
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

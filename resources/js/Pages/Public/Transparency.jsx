import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { DollarSign, TrendingUp, PieChart, FileText, Download, MapPin, Package, Users } from 'lucide-react';

export default function Transparency({ donations, expenses, distributions, impactReports }) {
    const totalDonations = donations?.reduce((sum, d) => sum + (d.amount_usd || d.amount || 0), 0) || 0;
    const totalExpenses = expenses?.reduce((sum, e) => sum + (e.amount || 0), 0) || 0;
    const totalBeneficiaries = distributions?.reduce((sum, d) => sum + (d.beneficiary_count || 0), 0) || 0;

    return (
        <PublicLayout>
            <Head title="Transparency - Girl Child Hygiene Foundation" />
            
            <section className="bg-gradient-to-br from-rose-600 to-rose-800 text-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-bold">Transparency</h1>
                    <p className="mt-4 text-lg text-rose-100 max-w-2xl">
                        We believe in complete transparency. See how your donations are making a real impact.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-green-50 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-green-600 font-medium">Total Donations</p>
                                    <p className="text-2xl font-bold text-green-700">${totalDonations.toLocaleString()}</p>
                                </div>
                                <DollarSign className="h-10 w-10 text-green-500" />
                            </div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-600 font-medium">Total Expenses</p>
                                    <p className="text-2xl font-bold text-blue-700">${totalExpenses.toLocaleString()}</p>
                                </div>
                                <TrendingUp className="h-10 w-10 text-blue-500" />
                            </div>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-600 font-medium">Distributions</p>
                                    <p className="text-2xl font-bold text-purple-700">{distributions?.length || 0}</p>
                                </div>
                                <Package className="h-10 w-10 text-purple-500" />
                            </div>
                        </div>
                        <div className="bg-rose-50 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-rose-600 font-medium">Beneficiaries</p>
                                    <p className="text-2xl font-bold text-rose-700">{totalBeneficiaries.toLocaleString()}</p>
                                </div>
                                <Users className="h-10 w-10 text-rose-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Distributions</h2>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">State/LGA</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiaries</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Evidence</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {(distributions || []).slice(0, 10).map((dist) => (
                                        <tr key={dist.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(dist.distribution_date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {dist.location_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {dist.state}, {dist.local_government}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {dist.beneficiary_count}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {dist.items_distributed || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {dist.photo_urls && dist.photo_urls.length > 0 && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                                        <FileText className="h-3 w-3 mr-1" /> Photos
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {impactReports && impactReports.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Impact Reports</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {impactReports.map((report) => (
                                <div key={report.id} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <FileText className="h-8 w-8 text-rose-600" />
                                        <span className="text-sm text-gray-500">{report.period || report.year}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900">{report.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{report.summary}</p>
                                    {report.file_url && (
                                        <a href={report.file_url} target="_blank" rel="noopener noreferrer" 
                                           className="inline-flex items-center mt-4 text-rose-600 text-sm font-medium hover:text-rose-700">
                                            <Download className="h-4 w-4 mr-1" /> Download Report
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-16 bg-rose-600 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold">Your Trust Matters</h2>
                    <p className="mt-4 text-rose-100 max-w-2xl mx-auto">
                        We are committed to using every donation responsibly and transparently. 
                        Have questions? Contact us anytime.
                    </p>
                    <div className="mt-8">
                        <Link href="/contact" className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-rose-50 transition">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

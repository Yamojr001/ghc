import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Heart, Package, GraduationCap, CreditCard, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const donationCategories = [
    { id: 'pad', icon: Package, title: 'Donate a Pad', amount: 1, description: 'Provide sanitary pads', impact: '= 10 pads' },
    { id: 'empower', icon: Heart, title: 'Empower a Girl', amount: 2.5, description: 'Monthly support package', impact: '= 1 month support' },
    { id: 'school', icon: GraduationCap, title: 'Send Back to School', amount: 5, description: 'School supplies & support', impact: '= Full school kit' },
];

const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
    { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 1550 },
];

export default function Donate({ programs }) {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('empower');
    const [customAmount, setCustomAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [donationComplete, setDonationComplete] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        donor_name: '',
        donor_email: '',
        donor_country: '',
        amount: 2.5,
        currency: 'USD',
        amount_usd: 2.5,
        donation_type: 'one_time',
        category: 'empower',
        payment_method: 'bank_transfer',
        is_anonymous: false,
        message: '',
    });

    const selectedCurrency = currencies.find(c => c.code === currency);
    const selectedCategoryData = donationCategories.find(c => c.id === selectedCategory);
    
    const getFinalAmount = () => {
        if (customAmount) return parseFloat(customAmount);
        return selectedCategoryData?.amount || 2.5;
    };

    const getAmountInUSD = () => {
        const finalAmount = getFinalAmount();
        if (currency === 'USD') return finalAmount;
        return finalAmount / selectedCurrency.rate;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalAmount = getFinalAmount();
        
        post('/donate', {
            data: {
                ...data,
                amount: finalAmount,
                currency: currency,
                amount_usd: getAmountInUSD(),
                category: selectedCategory,
            },
            onSuccess: () => setDonationComplete(true),
        });
    };

    if (donationComplete) {
        return (
            <PublicLayout>
                <Head title="Thank You - Donation" />
                <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-8">
                            <Check className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Thank You for Your Generosity!
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Your donation has been recorded. Once we verify your transfer, you'll receive a confirmation email.
                        </p>
                        <a href="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-amber-600">
                            Return Home
                        </a>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Donate - Girl Child Hygiene Foundation" />

            <section className="relative py-16 overflow-hidden bg-gradient-to-br from-rose-600 via-rose-500 to-amber-500">
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <Heart className="w-16 h-16 text-white/80 mx-auto mb-6" />
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Make a Donation</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Your generosity provides dignity, education, and hope to girls who need it most.
                    </p>
                </div>
            </section>

            <div className="bg-white border-b sticky top-16 z-40">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {['Choose Amount', 'Your Details', 'Payment'].map((label, index) => (
                            <div key={label} className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                                    step > index + 1 ? 'bg-emerald-500 text-white' : 
                                    step === index + 1 ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                    {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
                                </div>
                                <span className={`ml-2 text-sm hidden sm:block ${step === index + 1 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                    {label}
                                </span>
                                {index < 2 && <div className="w-12 sm:w-24 h-1 bg-gray-200 mx-4" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Choose Your Donation</h2>
                            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                                {donationCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => { setSelectedCategory(cat.id); setCustomAmount(''); }}
                                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                                            selectedCategory === cat.id ? 'border-rose-500 bg-rose-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <cat.icon className={`w-8 h-8 mb-3 ${selectedCategory === cat.id ? 'text-rose-500' : 'text-gray-400'}`} />
                                        <h3 className="font-bold text-gray-900 mb-1">{cat.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{cat.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-rose-600">${cat.amount}+</span>
                                            <span className="text-xs text-gray-500">{cat.impact}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Amount</label>
                                <div className="flex gap-4">
                                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="px-4 py-2 border rounded-lg">
                                        {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                                    </select>
                                    <input
                                        type="number"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        className="flex-1 px-4 py-2 border rounded-lg"
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={() => setStep(2)} className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700">
                                    Next <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Details</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                    <input type="text" value={data.donor_name} onChange={(e) => setData('donor_name', e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <input type="email" value={data.donor_email} onChange={(e) => setData('donor_email', e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                    <input type="text" value={data.donor_country} onChange={(e) => setData('donor_country', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                                    <textarea value={data.message} onChange={(e) => setData('message', e.target.value)} className="w-full px-4 py-2 border rounded-lg" rows={3} />
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="anonymous" checked={data.is_anonymous} onChange={(e) => setData('is_anonymous', e.target.checked)} className="h-4 w-4 text-rose-600 rounded" />
                                    <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">Make my donation anonymous</label>
                                </div>
                            </div>
                            <div className="flex justify-between mt-8">
                                <button type="button" onClick={() => setStep(1)} className="inline-flex items-center px-6 py-3 border rounded-lg">
                                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                </button>
                                <button type="button" onClick={() => setStep(3)} className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700">
                                    Next <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Payment Method</h2>
                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <h3 className="font-semibold mb-4">Donation Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span>Amount:</span><span className="font-bold">{selectedCurrency.symbol}{getFinalAmount().toFixed(2)} {currency}</span></div>
                                    <div className="flex justify-between"><span>Category:</span><span>{selectedCategoryData?.title}</span></div>
                                    <div className="flex justify-between"><span>Type:</span><span>{data.donation_type === 'monthly' ? 'Monthly' : 'One-time'}</span></div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <div className="space-y-3">
                                    {[{ id: 'bank_transfer', label: 'Bank Transfer', icon: CreditCard }].map(method => (
                                        <label key={method.id} className={`flex items-center p-4 border rounded-xl cursor-pointer ${data.payment_method === method.id ? 'border-rose-500 bg-rose-50' : 'border-gray-200'}`}>
                                            <input type="radio" name="payment_method" value={method.id} checked={data.payment_method === method.id} onChange={(e) => setData('payment_method', e.target.value)} className="mr-3" />
                                            <method.icon className="w-5 h-5 mr-3 text-gray-500" />
                                            <span>{method.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-amber-50 rounded-xl p-6 mb-8">
                                <h3 className="font-semibold text-amber-800 mb-4">Bank Transfer Details</h3>
                                <div className="space-y-2 text-amber-700 text-sm">
                                    <p><strong>Bank:</strong> Global Impact Bank</p>
                                    <p><strong>Account Name:</strong> Girl Child Hygiene Foundation</p>
                                    <p><strong>Account Number:</strong> 1234567890</p>
                                    <p><strong>Routing/SWIFT:</strong> GCHABCXXX</p>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <button type="button" onClick={() => setStep(2)} className="inline-flex items-center px-6 py-3 border rounded-lg">
                                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                </button>
                                <button type="submit" disabled={processing} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-600 to-amber-500 text-white rounded-lg font-medium hover:from-rose-700 hover:to-amber-600 disabled:opacity-50">
                                    {processing ? 'Processing...' : 'Complete Donation'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </PublicLayout>
    );
}

import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Upload, MapPin, X } from 'lucide-react';
import { useState } from 'react';

export default function DistributionCreate({ programs }) {
    const [photoPreview, setPhotoPreview] = useState([]);
    
    const { data, setData, post, processing, errors } = useForm({
        program_id: '',
        location_name: '',
        location_type: 'community',
        state: '',
        local_government: '',
        region: '',
        country: 'Nigeria',
        gps_latitude: '',
        gps_longitude: '',
        beneficiary_count: '',
        items_distributed: '',
        items_list: [],
        total_amount: '',
        distribution_date: new Date().toISOString().split('T')[0],
        photo_urls: [],
        video_url: '',
        notes: '',
        status: 'pending',
        field_officer_name: '',
    });

    const nigerianStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
        'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
        'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
        'Yobe', 'Zamfara'
    ];

    const [itemInput, setItemInput] = useState({ name: '', quantity: '', unit: '' });

    const addItem = () => {
        if (itemInput.name && itemInput.quantity) {
            setData('items_list', [...data.items_list, { ...itemInput }]);
            setItemInput({ name: '', quantity: '', unit: '' });
        }
    };

    const removeItem = (index) => {
        setData('items_list', data.items_list.filter((_, i) => i !== index));
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(prev => [...prev, e.target.result]);
                setData('photo_urls', [...data.photo_urls, e.target.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removePhoto = (index) => {
        setPhotoPreview(prev => prev.filter((_, i) => i !== index));
        setData('photo_urls', data.photo_urls.filter((_, i) => i !== index));
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData({
                        ...data,
                        gps_latitude: position.coords.latitude.toString(),
                        gps_longitude: position.coords.longitude.toString(),
                    });
                },
                (error) => {
                    alert('Unable to get location: ' + error.message);
                }
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/distributions');
    };

    return (
        <AdminLayout header="Create Distribution">
            <Head title="Create Distribution" />

            <div className="mb-6">
                <Link href="/admin/distributions" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Distributions
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Location Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location Name *</label>
                            <input
                                type="text"
                                value={data.location_name}
                                onChange={e => setData('location_name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                                placeholder="e.g., Community Primary School"
                            />
                            {errors.location_name && <p className="mt-1 text-sm text-red-600">{errors.location_name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
                            <select
                                value={data.location_type}
                                onChange={e => setData('location_type', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                            >
                                <option value="school">School</option>
                                <option value="community">Community</option>
                                <option value="health_center">Health Center</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                            <select
                                value={data.state}
                                onChange={e => setData('state', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                            >
                                <option value="">Select State</option>
                                {nigerianStates.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Local Government *</label>
                            <input
                                type="text"
                                value={data.local_government}
                                onChange={e => setData('local_government', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                                placeholder="Enter LGA name"
                            />
                            {errors.local_government && <p className="mt-1 text-sm text-red-600">{errors.local_government}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">GPS Coordinates</label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={data.gps_latitude}
                                    onChange={e => setData('gps_latitude', e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Latitude"
                                />
                                <input
                                    type="text"
                                    value={data.gps_longitude}
                                    onChange={e => setData('gps_longitude', e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Longitude"
                                />
                                <button
                                    type="button"
                                    onClick={getLocation}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
                                >
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Get Location
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Distribution Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                            <select
                                value={data.program_id}
                                onChange={e => setData('program_id', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select Program</option>
                                {(programs || []).map(program => (
                                    <option key={program.id} value={program.id}>{program.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Distribution Date *</label>
                            <input
                                type="date"
                                value={data.distribution_date}
                                onChange={e => setData('distribution_date', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Beneficiaries *</label>
                            <input
                                type="number"
                                value={data.beneficiary_count}
                                onChange={e => setData('beneficiary_count', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                min="1"
                            />
                            {errors.beneficiary_count && <p className="mt-1 text-sm text-red-600">{errors.beneficiary_count}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount Spent</label>
                            <input
                                type="number"
                                value={data.total_amount}
                                onChange={e => setData('total_amount', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                step="0.01"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Field Officer Name</label>
                            <input
                                type="text"
                                value={data.field_officer_name}
                                onChange={e => setData('field_officer_name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Total Items Distributed</label>
                            <input
                                type="number"
                                value={data.items_distributed}
                                onChange={e => setData('items_distributed', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Items List</label>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={itemInput.name}
                                onChange={e => setItemInput({ ...itemInput, name: e.target.value })}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Item name"
                            />
                            <input
                                type="number"
                                value={itemInput.quantity}
                                onChange={e => setItemInput({ ...itemInput, quantity: e.target.value })}
                                className="w-24 px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Qty"
                            />
                            <input
                                type="text"
                                value={itemInput.unit}
                                onChange={e => setItemInput({ ...itemInput, unit: e.target.value })}
                                className="w-24 px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Unit"
                            />
                            <button
                                type="button"
                                onClick={addItem}
                                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                            >
                                Add
                            </button>
                        </div>
                        {data.items_list.length > 0 && (
                            <div className="space-y-2">
                                {data.items_list.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                                        <span>{item.name} - {item.quantity} {item.unit}</span>
                                        <button type="button" onClick={() => removeItem(index)} className="text-red-600 hover:text-red-700">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <textarea
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            rows={3}
                        ></textarea>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Evidence & Photos</h2>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Upload photos as evidence of the distribution</p>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
                            <Upload className="h-4 w-4 mr-2" />
                            Select Photos
                        </label>
                    </div>
                    {photoPreview.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {photoPreview.map((photo, index) => (
                                <div key={index} className="relative">
                                    <img src={photo} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (optional)</label>
                        <input
                            type="url"
                            value={data.video_url}
                            onChange={e => setData('video_url', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/distributions" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-6 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 disabled:opacity-50"
                    >
                        <Save className="h-5 w-5 mr-2" />
                        {processing ? 'Saving...' : 'Save Distribution'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

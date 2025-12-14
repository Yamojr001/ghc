import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Image, Video, Calendar, MapPin, X } from 'lucide-react';
import { useState } from 'react';

export default function Media({ galleryItems, distributions }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeTab, setActiveTab] = useState('gallery');

    const allPhotos = [];
    
    (galleryItems || []).forEach(item => {
        allPhotos.push({
            id: `gallery-${item.id}`,
            url: item.image_url,
            title: item.title,
            description: item.description,
            date: item.created_at,
            type: 'gallery'
        });
    });

    (distributions || []).forEach(dist => {
        if (dist.photo_urls && Array.isArray(dist.photo_urls)) {
            dist.photo_urls.forEach((url, idx) => {
                allPhotos.push({
                    id: `dist-${dist.id}-${idx}`,
                    url: url,
                    title: `Distribution at ${dist.location_name}`,
                    description: `${dist.beneficiary_count} beneficiaries reached`,
                    date: dist.distribution_date,
                    location: `${dist.state}, ${dist.local_government}`,
                    type: 'distribution'
                });
            });
        }
    });

    return (
        <PublicLayout>
            <Head title="Media Gallery - Girl Child Hygiene Foundation" />
            
            <section className="bg-gradient-to-br from-rose-600 to-rose-800 text-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl lg:text-5xl font-bold">Media Gallery</h1>
                    <p className="mt-4 text-lg text-rose-100 max-w-2xl">
                        See the impact of our work through photos and videos from our programs and distributions.
                    </p>
                </div>
            </section>

            <section className="py-8 bg-white border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`px-6 py-2 rounded-lg font-medium transition ${
                                activeTab === 'gallery' 
                                    ? 'bg-rose-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <Image className="inline h-5 w-5 mr-2" />
                            Gallery
                        </button>
                        <button
                            onClick={() => setActiveTab('distributions')}
                            className={`px-6 py-2 rounded-lg font-medium transition ${
                                activeTab === 'distributions' 
                                    ? 'bg-rose-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <MapPin className="inline h-5 w-5 mr-2" />
                            Distribution Photos
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {activeTab === 'gallery' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {(galleryItems || []).map((item) => (
                                <div 
                                    key={item.id} 
                                    className="relative group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm"
                                    onClick={() => setSelectedImage(item)}
                                >
                                    <div className="aspect-square">
                                        <img 
                                            src={item.image_url} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end">
                                        <div className="p-4 text-white">
                                            <h3 className="font-medium">{item.title}</h3>
                                            <p className="text-sm text-white/80">{item.category}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'distributions' && (
                        <div className="space-y-8">
                            {(distributions || []).filter(d => d.photo_urls && d.photo_urls.length > 0).map((dist) => (
                                <div key={dist.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="p-6 border-b">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{dist.location_name}</h3>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                    <span className="flex items-center">
                                                        <MapPin className="h-4 w-4 mr-1" />
                                                        {dist.state}, {dist.local_government}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-1" />
                                                        {new Date(dist.distribution_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-rose-600">{dist.beneficiary_count}</div>
                                                <div className="text-sm text-gray-600">Beneficiaries</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {dist.photo_urls.map((url, idx) => (
                                                <div 
                                                    key={idx}
                                                    className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                                                    onClick={() => setSelectedImage({ image_url: url, title: dist.location_name })}
                                                >
                                                    <img src={url} alt={`Distribution ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {((activeTab === 'gallery' && (!galleryItems || galleryItems.length === 0)) ||
                      (activeTab === 'distributions' && (!distributions || distributions.filter(d => d.photo_urls?.length > 0).length === 0))) && (
                        <div className="text-center py-12">
                            <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No photos yet</h3>
                            <p className="text-gray-600">Check back soon for updates from our programs.</p>
                        </div>
                    )}
                </div>
            </section>

            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full">
                        <X className="h-6 w-6" />
                    </button>
                    <div className="max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage.image_url} alt={selectedImage.title} className="max-w-full max-h-[80vh] rounded-lg" />
                        <div className="mt-4 text-white text-center">
                            <h3 className="text-lg font-medium">{selectedImage.title}</h3>
                            {selectedImage.description && <p className="text-white/80">{selectedImage.description}</p>}
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}

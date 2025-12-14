import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, Heart, CheckCircle, XCircle } from 'lucide-react';

export default function ProgramsIndex({ programs }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this program?')) {
            router.delete(`/admin/programs/${id}`);
        }
    };

    return (
        <AdminLayout header="Programs">
            <Head title="Manage Programs" />

            <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">Manage your organization's programs</p>
                <Link
                    href="/admin/programs/create"
                    className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    New Program
                </Link>
            </div>

            <div className="grid gap-6">
                {(programs || []).map((program) => (
                    <div key={program.id} className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start">
                                <div className="p-3 bg-rose-100 rounded-lg mr-4">
                                    <Heart className="h-6 w-6 text-rose-600" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900">{program.name}</h3>
                                        {program.is_active ? (
                                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                                <XCircle className="h-3 w-3 mr-1" />
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mt-1">{program.short_description || program.description?.substring(0, 150)}</p>
                                    {program.required_funding && (
                                        <div className="mt-3">
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="text-gray-600">Funding Progress</span>
                                                <span className="font-medium">${(program.current_funding || 0).toLocaleString()} / ${program.required_funding.toLocaleString()}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-rose-600 h-2 rounded-full"
                                                    style={{ width: `${Math.min(((program.current_funding || 0) / program.required_funding) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Link href={`/admin/programs/${program.id}/edit`} className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg">
                                    <Edit className="h-4 w-4" />
                                </Link>
                                <button onClick={() => handleDelete(program.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(!programs || programs.length === 0) && (
                <div className="text-center py-12 bg-white rounded-xl">
                    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No programs yet</h3>
                    <p className="text-gray-600 mb-4">Start by creating your first program.</p>
                    <Link href="/admin/programs/create" className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700">
                        <Plus className="h-5 w-5 mr-2" />
                        New Program
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}

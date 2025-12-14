import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, Shield, User, UserCheck, Mail } from 'lucide-react';

export default function UsersIndex({ users, auth }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/admin/users/${id}`);
        }
    };

    const roleColors = {
        admin: 'bg-purple-100 text-purple-700',
        staff: 'bg-blue-100 text-blue-700',
        user: 'bg-gray-100 text-gray-700',
    };

    const roleIcons = {
        admin: Shield,
        staff: UserCheck,
        user: User,
    };

    return (
        <AdminLayout header="User Management">
            <Head title="User Management" />

            <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">Manage system users and their roles</p>
                <Link
                    href="/admin/users/create"
                    className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add User
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {(users?.data || users || []).map((user) => {
                                const RoleIcon = roleIcons[user.role] || User;
                                return (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 bg-rose-100 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-rose-600 font-medium">
                                                        {user.name?.charAt(0)?.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-gray-600">
                                                <Mail className="h-4 w-4 mr-2" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                                                <RoleIcon className="h-3 w-3 mr-1" />
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link href={`/admin/users/${user.id}/edit`} className="inline-flex p-2 text-gray-600 hover:text-green-600">
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            {auth.user.id !== user.id && (
                                                <button onClick={() => handleDelete(user.id)} className="inline-flex p-2 text-gray-600 hover:text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {(!users || (Array.isArray(users) ? users.length === 0 : users.data?.length === 0)) && (
                    <div className="text-center py-12">
                        <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

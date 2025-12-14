import axios from 'axios';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js'; // <-- FIXED: Use NAMED import

/**
 * Utility to build query parameters for filter routes, ignoring null/empty values.
 * ... (rest of function body remains the same)
 */
const buildQuery = (params) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '' && value !== 'all') {
            query.append(key, String(value));
        }
    });
    return query.toString();
};

const apiClient = {
    auth: {
        logout: (redirectPath) => {
            router.post(route('logout'), {}, {
                onFinish: () => {
                    window.location.href = redirectPath; 
                },
                onError: (errors) => {
                    console.error('Logout failed:', errors);
                }
            });
        },
    },
    
    entities: {
        
        // --- Donation Entity (Admin Data) ---
        Donation: {
            list: async (sort = '-created_at', limit = 200) => {
                const query = buildQuery({ sort, limit });
                const url = route('admin.data.donations') + (query ? `?${query}` : '');
                const response = await axios.get(url);
                return response.data;
            },
        },
        
        // --- Distribution Entity (Admin/Staff Data) ---
        Distribution: {
            list: async (sort = '-created_at', limit = 200) => {
                const query = buildQuery({ sort, limit });
                const url = route('admin.data.distributions') + (query ? `?${query}` : '');
                const response = await axios.get(url);
                return response.data;
            },
            filter: async (params, sort = '-created_at', limit) => {
                const query = buildQuery({ ...params, sort, limit });
                const url = route('admin.data.distributions') + (query ? `?${query}` : '');
                const response = await axios.get(url);
                return response.data;
            },
            create: async (data) => {
                const url = route('staff.distributions.store');
                const response = await axios.post(url, data);
                return response.data;
            }
        },
        
        // --- Expense Entity (Admin Data) ---
        Expense: {
            list: async (sort = '-created_at', limit = 200) => {
                const query = buildQuery({ sort, limit });
                const url = route('admin.data.expenses') + (query ? `?${query}` : '');
                const response = await axios.get(url);
                return response.data;
            },
            create: async (data) => {
                const url = route('admin.expenses.store');
                const response = await axios.post(url, data);
                return response.data;
            },
        },

        // --- User Entity (Admin Data) ---
        User: {
            list: async (sort = '-created_at') => {
                const query = buildQuery({ sort });
                const url = route('admin.data.users') + (query ? `?${query}` : '');
                const response = await axios.get(url);
                return response.data;
            },
        },
    },
    
    integrations: {
        Core: {
            UploadFile: async ({ file }) => {
                const formData = new FormData();
                formData.append('file', file);
                const url = route('file.upload');
                
                const response = await axios.post(url, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                return response.data; 
            }
        }
    }
};

export default apiClient;
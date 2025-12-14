<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Admin View - User Management Page.
     */
    public function index(Request $request)
    {
        $users = $this->filterData($request, false);
        return Inertia::render('Admin/AdminUsers', ['users' => $users]);
    }

    /**
     * Filter users for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = User::query();
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(fn ($q) => 
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
            );
        }
        
        $query->orderBy('created_at', 'desc');
        
        $users = $query->get();

        if ($returnJson) {
            return response()->json($users);
        }
        return $users;
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'in:user,staff,admin'], // Adjusted roles
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json($user, 201);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'role' => ['sometimes', 'in:user,staff,admin'],
        ]);

        $user->update($request->only('name', 'email', 'role'));
        
        return back()->with('success', 'User updated successfully.');
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Distribution;
use App\Models\Donation;
use App\Models\Expense;
use App\Models\FAQ;
use App\Models\GalleryItem;
use App\Models\ImpactReport;
use App\Models\Partner;
use App\Models\Program;
use App\Models\Subscriber;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalDonations' => Donation::where('status', 'verified')->sum('amount_usd'),
                'totalBeneficiaries' => Distribution::sum('beneficiary_count'),
                'totalDistributions' => Distribution::count(),
                'activePrograms' => Program::where('is_active', true)->count(),
                'blogPosts' => BlogPost::count(),
                'galleryItems' => GalleryItem::count(),
                'volunteers' => Volunteer::count(),
                'partners' => Partner::count(),
                'recentDistributions' => Distribution::latest('distribution_date')->take(5)->get(),
                'recentDonations' => Donation::latest()->take(5)->get(),
            ],
        ]);
    }

    // Distributions
    public function distributions()
    {
        return Inertia::render('Admin/Distributions/Index', [
            'distributions' => Distribution::with('program')->latest('distribution_date')->get(),
        ]);
    }

    public function createDistribution()
    {
        return Inertia::render('Admin/Distributions/Create', [
            'programs' => Program::where('is_active', true)->get(),
        ]);
    }

    public function storeDistribution(Request $request)
    {
        $validated = $request->validate([
            'program_id' => 'nullable|exists:programs,id',
            'location_name' => 'required|string|max:255',
            'location_type' => 'nullable|in:school,community,health_center,other',
            'state' => 'required|string|max:255',
            'local_government' => 'required|string|max:255',
            'region' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'gps_latitude' => 'nullable|numeric',
            'gps_longitude' => 'nullable|numeric',
            'beneficiary_count' => 'required|integer|min:1',
            'items_distributed' => 'nullable|integer',
            'items_list' => 'nullable|array',
            'total_amount' => 'nullable|numeric',
            'distribution_date' => 'required|date',
            'photo_urls' => 'nullable|array',
            'video_url' => 'nullable|url',
            'notes' => 'nullable|string',
            'field_officer_name' => 'nullable|string|max:255',
        ]);

        Distribution::create($validated);

        return redirect()->route('admin.distributions')->with('success', 'Distribution created successfully.');
    }

    public function editDistribution(Distribution $distribution)
    {
        return Inertia::render('Admin/Distributions/Edit', [
            'distribution' => $distribution,
            'programs' => Program::where('is_active', true)->get(),
        ]);
    }

    public function updateDistribution(Request $request, Distribution $distribution)
    {
        $validated = $request->validate([
            'program_id' => 'nullable|exists:programs,id',
            'location_name' => 'required|string|max:255',
            'location_type' => 'nullable|in:school,community,health_center,other',
            'state' => 'required|string|max:255',
            'local_government' => 'required|string|max:255',
            'beneficiary_count' => 'required|integer|min:1',
            'items_distributed' => 'nullable|integer',
            'items_list' => 'nullable|array',
            'total_amount' => 'nullable|numeric',
            'distribution_date' => 'required|date',
            'photo_urls' => 'nullable|array',
            'notes' => 'nullable|string',
            'status' => 'nullable|in:pending,approved,rejected',
        ]);

        $distribution->update($validated);

        return redirect()->route('admin.distributions')->with('success', 'Distribution updated successfully.');
    }

    public function destroyDistribution(Distribution $distribution)
    {
        $distribution->delete();
        return redirect()->route('admin.distributions')->with('success', 'Distribution deleted successfully.');
    }

    // Users
    public function users()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::latest()->get(),
        ]);
    }

    public function createUser()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:admin,staff,user',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect()->route('admin.users')->with('success', 'User created successfully.');
    }

    public function editUser(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,staff,user',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role = $validated['role'];
        
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        
        $user->save();

        return redirect()->route('admin.users')->with('success', 'User updated successfully.');
    }

    public function destroyUser(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }
        
        $user->delete();
        return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
    }

    // Blog Posts
    public function blogPosts()
    {
        return Inertia::render('Admin/BlogPosts/Index', [
            'posts' => BlogPost::latest()->get(),
        ]);
    }

    public function createBlogPost()
    {
        return Inertia::render('Admin/BlogPosts/Create');
    }

    public function storeBlogPost(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blog_posts',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'author' => 'nullable|string|max:255',
            'is_published' => 'boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = \Str::slug($validated['title']);
        }

        if ($validated['is_published'] ?? false) {
            $validated['published_at'] = now();
        }

        BlogPost::create($validated);

        return redirect()->route('admin.blog-posts')->with('success', 'Blog post created successfully.');
    }

    // Gallery
    public function gallery()
    {
        return Inertia::render('Admin/Gallery/Index', [
            'items' => GalleryItem::latest()->get(),
        ]);
    }

    public function createGalleryItem()
    {
        return Inertia::render('Admin/Gallery/Create');
    }

    public function storeGalleryItem(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'required|string',
            'category' => 'nullable|string|max:100',
            'is_active' => 'boolean',
        ]);

        GalleryItem::create($validated);

        return redirect()->route('admin.gallery')->with('success', 'Gallery item created successfully.');
    }

    // Programs
    public function programs()
    {
        return Inertia::render('Admin/Programs/Index', [
            'programs' => Program::orderBy('display_order')->get(),
        ]);
    }

    public function createProgram()
    {
        return Inertia::render('Admin/Programs/Create');
    }

    public function storeProgram(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'description' => 'required|string',
            'short_description' => 'nullable|string',
            'image_url' => 'nullable|string',
            'goal' => 'nullable|string',
            'required_funding' => 'nullable|numeric',
            'current_funding' => 'nullable|numeric',
            'is_active' => 'boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = \Str::slug($validated['name']);
        }

        Program::create($validated);

        return redirect()->route('admin.programs')->with('success', 'Program created successfully.');
    }

    // Donations
    public function donations()
    {
        return Inertia::render('Admin/Donations/Index', [
            'donations' => Donation::latest()->get(),
        ]);
    }

    public function verifyDonation(Donation $donation)
    {
        $donation->update(['status' => 'verified']);
        return back()->with('success', 'Donation verified successfully.');
    }
}

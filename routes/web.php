<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/transparency', [PublicController::class, 'transparency'])->name('transparency');
Route::get('/programs', [PublicController::class, 'programs'])->name('programs');
Route::get('/donors', [PublicController::class, 'donors'])->name('donors');
Route::get('/media', [PublicController::class, 'media'])->name('media');
Route::get('/blog', [PublicController::class, 'blog'])->name('blog');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::post('/contact', [PublicController::class, 'submitContact'])->name('contact.submit');
Route::post('/subscribe', [PublicController::class, 'subscribe'])->name('subscribe');

// Team page
Route::get('/team', function () {
    return Inertia::render('Public/About', [
        'teamMembers' => \App\Models\TeamMember::where('is_active', true)->orderBy('display_order')->get(),
    ]);
})->name('team');

// Auth protected routes
Route::get('/dashboard', function () {
    return redirect('/admin');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes (Admin Only)
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    // Distributions
    Route::get('/distributions', [AdminController::class, 'distributions'])->name('admin.distributions');
    Route::get('/distributions/create', [AdminController::class, 'createDistribution'])->name('admin.distributions.create');
    Route::post('/distributions', [AdminController::class, 'storeDistribution'])->name('admin.distributions.store');
    Route::get('/distributions/{distribution}/edit', [AdminController::class, 'editDistribution'])->name('admin.distributions.edit');
    Route::put('/distributions/{distribution}', [AdminController::class, 'updateDistribution'])->name('admin.distributions.update');
    Route::delete('/distributions/{distribution}', [AdminController::class, 'destroyDistribution'])->name('admin.distributions.destroy');
    
    // Users (Admin only can manage users)
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::get('/users/create', [AdminController::class, 'createUser'])->name('admin.users.create');
    Route::post('/users', [AdminController::class, 'storeUser'])->name('admin.users.store');
    Route::get('/users/{user}/edit', [AdminController::class, 'editUser'])->name('admin.users.edit');
    Route::put('/users/{user}', [AdminController::class, 'updateUser'])->name('admin.users.update');
    Route::delete('/users/{user}', [AdminController::class, 'destroyUser'])->name('admin.users.destroy');
    
    // Blog Posts
    Route::get('/blog-posts', [AdminController::class, 'blogPosts'])->name('admin.blog-posts');
    Route::get('/blog-posts/create', [AdminController::class, 'createBlogPost'])->name('admin.blog-posts.create');
    Route::post('/blog-posts', [AdminController::class, 'storeBlogPost'])->name('admin.blog-posts.store');
    
    // Gallery
    Route::get('/gallery', [AdminController::class, 'gallery'])->name('admin.gallery');
    Route::get('/gallery/create', [AdminController::class, 'createGalleryItem'])->name('admin.gallery.create');
    Route::post('/gallery', [AdminController::class, 'storeGalleryItem'])->name('admin.gallery.store');
    
    // Programs
    Route::get('/programs', [AdminController::class, 'programs'])->name('admin.programs');
    Route::get('/programs/create', [AdminController::class, 'createProgram'])->name('admin.programs.create');
    Route::post('/programs', [AdminController::class, 'storeProgram'])->name('admin.programs.store');
    
    // Donations
    Route::get('/donations', [AdminController::class, 'donations'])->name('admin.donations');
});

require __DIR__.'/auth.php';

<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    /**
     * Public View - Index page for blog posts.
     */
    public function index(Request $request)
    {
        // Default filter for public view
        $request->merge(['status' => 'published', 'sort' => '-published_at']); 
        $posts = $this->filterData($request, false);

        return Inertia::render('Blogs/Index', ['posts' => $posts]);
    }
    
    /**
     * Filter blog posts for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = BlogPost::query();
        // ... (Your original filter logic) ...
        
        $blogPosts = $query->get();
        if ($returnJson) {
            return response()->json($blogPosts);
        }
        return $blogPosts;
    }
    
    // ... (Your original store, show, update, destroy methods - updated to return JSON/back())
}
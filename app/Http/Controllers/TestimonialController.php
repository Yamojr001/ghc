<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    /**
     * Public View - Index page for testimonials.
     */
    public function index(Request $request)
    {
        // Default filter for public view
        $request->merge(['is_approved' => true, 'sort' => 'display_order']); 
        $testimonials = $this->filterData($request, false);

        return Inertia::render('Testimonials/Index', ['testimonials' => $testimonials]);
    }
    
    /**
     * Filter testimonials for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = Testimonial::query();

        if ($request->has('is_featured')) {
            $query->where('is_featured', $request->boolean('is_featured'));
        }
        if ($request->has('is_approved')) {
            $query->where('is_approved', $request->boolean('is_approved'));
        }
        // ... (rest of filtering/sorting logic) ...
        
        $testimonials = $query->get();

        if ($returnJson) {
            return response()->json($testimonials);
        }
        return $testimonials;
    }
    
    // ... (Your original store, update, destroy methods - updated to return JSON/back())
}
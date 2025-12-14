<?php

namespace App\Http\Controllers;

use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class GalleryItemController extends Controller
{
    /**
     * Public View - Gallery Page.
     */
    public function index(Request $request)
    {
        $galleryItems = $this->filterData($request, false);
        return Inertia::render('Gallery/Index', ['galleryItems' => $galleryItems]);
    }
    
    /**
     * Filter gallery items for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = GalleryItem::query();

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }
        if ($request->has('is_featured')) {
            $query->where('is_featured', $request->boolean('is_featured'));
        }
        
        $query->orderBy('created_at', 'desc');

        $galleryItems = $query->get();

        if ($returnJson) {
            return response()->json($galleryItems);
        }
        return $galleryItems;
    }

    /**
     * Store a newly created gallery item in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'media_url' => 'required|string|url',
            'media_type' => ['required', 'string', Rule::in(['image', 'video'])],
            // ... (rest of validation rules)
        ]);

        $galleryItem = GalleryItem::create($validatedData);

        return response()->json($galleryItem, 201);
    }
    
    /**
     * Update the specified gallery item in storage.
     */
    public function update(Request $request, GalleryItem $galleryItem)
    {
        $validatedData = $request->validate([
            'media_url' => 'nullable|string|url',
            // ... (rest of update rules)
        ]);

        $galleryItem->update($validatedData);

        return back()->with('success', 'Gallery item updated successfully.');
    }
}
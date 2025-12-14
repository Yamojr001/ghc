<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FAQController extends Controller
{
    /**
     * Public View - FAQ Page.
     */
    public function index(Request $request)
    {
        // Filter for public view: only active FAQs
        $request->merge(['is_active' => true, 'sort' => 'display_order']); 
        $faqs = $this->filterData($request, false);
        return Inertia::render('FAQs/Index', ['faqs' => $faqs]);
    }

    /**
     * Filter FAQs for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = FAQ::query();

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }
        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        $query->orderBy('display_order', 'asc')->orderBy('created_at', 'desc');

        $faqs = $query->get();

        if ($returnJson) {
            return response()->json($faqs);
        }
        return $faqs;
    }

    /**
     * Store a newly created FAQ in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            // ... (rest of validation rules)
        ]);

        $faq = FAQ::create($validatedData);

        return response()->json($faq, 201);
    }

    /**
     * Update the specified FAQ in storage.
     */
    public function update(Request $request, FAQ $faq)
    {
        $validatedData = $request->validate([
            'question' => 'nullable|string|max:255',
            'answer' => 'nullable|string',
            // ... (rest of update rules)
        ]);

        $faq->update($validatedData);

        return back()->with('success', 'FAQ updated successfully.');
    }
}
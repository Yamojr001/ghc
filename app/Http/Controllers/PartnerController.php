<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PartnerController extends Controller
{
    /**
     * Display the Partner listing (Admin or Public).
     */
    public function index(Request $request)
    {
        $partners = $this->filterData($request, false);
        return Inertia::render('Partners/Index', ['partners' => $partners]);
    }
    
    /**
     * Filter partners for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = Partner::query();

        if ($request->has('is_featured')) {
            $query->where('is_featured', $request->boolean('is_featured'));
        }
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }
        if ($request->has('partnership_type')) {
            $query->where('partnership_type', $request->input('partnership_type'));
        }

        $query->orderBy('display_order', 'asc')->orderBy('name', 'asc');

        $partners = $query->get();

        if ($returnJson) {
            return response()->json($partners);
        }
        return $partners;
    }

    /**
     * Store a newly created partner in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'logo_url' => 'nullable|string|url',
            'website' => 'nullable|string|url',
            'description' => 'nullable|string',
            'partnership_type' => ['nullable', 'string', Rule::in(['corporate_sponsor', 'ngo_partner', 'government', 'foundation', 'media', 'implementing_partner'])],
            'contribution_type' => ['nullable', 'string', Rule::in(['financial', 'in_kind', 'technical', 'advocacy'])],
            'is_featured' => 'nullable|boolean',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $partner = Partner::create($validatedData);

        return response()->json($partner, 201);
    }

    /**
     * Update the specified partner in storage.
     */
    public function update(Request $request, Partner $partner)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'logo_url' => 'nullable|string|url',
            'website' => 'nullable|string|url',
            'description' => 'nullable|string',
            'partnership_type' => ['nullable', 'string', Rule::in(['corporate_sponsor', 'ngo_partner', 'government', 'foundation', 'media', 'implementing_partner'])],
            'contribution_type' => ['nullable', 'string', Rule::in(['financial', 'in_kind', 'technical', 'advocacy'])],
            'is_featured' => 'nullable|boolean',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $partner->update($validatedData);

        return back()->with('success', 'Partner updated successfully.');
    }

    /**
     * Remove the specified partner from storage.
     */
    public function destroy(Partner $partner)
    {
        $partner->delete();
        return back()->with('success', 'Partner deleted successfully.');
    }
}
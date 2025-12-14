<?php

namespace App\Http\Controllers;

use App\Models\Distribution;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class DistributionController extends Controller
{
    /**
     * Display the Admin Distributions list Inertia page.
     */
    public function adminIndex(Request $request)
    {
        $distributions = $this->filterData($request, false);
        
        return Inertia::render('Admin/AdminDistributions', [
            'distributions' => $distributions,
            'filters' => $request->only('status', 'search'),
        ]);
    }
    
    /**
     * Display the Staff/Field Officer Distributions list Inertia page.
     */
    public function staffIndex(Request $request)
    {
        // Filter for the current user's submissions
        $request->merge(['field_officer_id' => Auth::id()]);
        $myDistributions = $this->filterData($request, false);
        
        return Inertia::render('Staff/FieldOfficer', [
            'myDistributions' => $myDistributions,
        ]);
    }

    /**
     * Filter distributions for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = Distribution::query();

        if ($request->has('field_officer_id')) {
            $query->where('field_officer_id', $request->input('field_officer_id'));
        }
        if ($request->has('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }
        // ... (rest of filtering logic) ...
        
        $distributions = $query->get();

        if ($returnJson) {
            return response()->json($distributions);
        }
        return $distributions;
    }

    /**
     * Store a newly created distribution in storage (Staff/Field Officer Submission).
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'location_name' => 'required|string|max:255',
            'beneficiary_count' => 'required|integer|min:1',
            'distribution_date' => 'required|date',
            // ... (rest of validation rules) ...
        ]);

        $validatedData['status'] = 'pending';
        $validatedData['field_officer_id'] = Auth::id();
        $validatedData['field_officer_name'] = Auth::user()->name;

        $distribution = Distribution::create($validatedData);

        return response()->json($distribution, 201); // Return JSON for XHR submission
    }
    
    /**
     * Update the specified distribution in storage (Admin Approval).
     */
    public function update(Request $request, Distribution $distribution)
    {
        $validatedData = $request->validate([
            'status' => ['nullable', 'string', Rule::in(['pending', 'approved', 'rejected'])],
            'rejection_reason' => 'nullable|string',
            // ... (rest of update rules) ...
        ]);
        
        if (isset($validatedData['status']) && 
            ($validatedData['status'] === 'approved' || $validatedData['status'] === 'rejected')) {
            $validatedData['approved_at'] = now();
            $validatedData['approved_by'] = Auth::user()->email ?? 'system';
        }

        $distribution->update($validatedData);

        return back()->with('success', 'Distribution updated successfully.');
    }
}
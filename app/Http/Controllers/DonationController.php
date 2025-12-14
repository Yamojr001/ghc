<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class DonationController extends Controller
{
    /**
     * Display the Admin Donations list Inertia page.
     */
    public function index(Request $request)
    {
        // Fetch data for the initial Inertia load
        $donations = $this->filterData($request, false);
        
        return Inertia::render('Admin/AdminDonations', [
            'donations' => $donations,
            'filters' => $request->only('status', 'sort', 'search'),
        ]);
    }

    /**
     * Filter donations for XHR/API calls (used by React components).
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = Donation::query();

        if ($request->has('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(fn ($q) => 
                $q->where('donor_name', 'like', '%' . $search . '%')
                  ->orWhere('donor_email', 'like', '%' . $search . '%')
                  ->orWhere('payment_reference', 'like', '%' . $search . '%')
            );
        }
        
        $sort = $request->get('sort', '-created_at');
        $sortDirection = str_starts_with($sort, '-') ? 'desc' : 'asc';
        $sortField = ltrim($sort, '-');
        $query->orderBy($sortField, $sortDirection);

        $limit = $request->input('limit') ?? ($returnJson ? 200 : null);
        if ($limit) {
             $query->limit($limit);
        }
        
        $donations = $query->get();

        if ($returnJson) {
            return response()->json($donations);
        }
        return $donations;
    }

    /**
     * Store a newly created donation in storage (Public Submission).
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'donor_email' => 'required|email|max:255',
            'amount' => 'required|numeric|min:0.01',
            'currency' => 'required|string|in:USD,GBP,EUR,NGN',
            'amount_usd' => 'required|numeric|min:0.01',
            'donor_name' => 'nullable|string|max:255',
            'donation_type' => 'nullable|string',
            'category' => 'nullable|string',
            // ... (rest of rules)
        ]);
        
        $donation = Donation::create($validatedData);
        
        return response()->json($donation, 201);
    }

    /**
     * Update the specified donation in storage (Admin Verification).
     */
    public function update(Request $request, Donation $donation)
    {
        $validatedData = $request->validate([
            // ... (Your update validation rules)
            'status' => ['nullable', 'string', Rule::in(['pending', 'verified', 'rejected', 'refunded'])],
            'notes' => 'nullable|string',
            'verified_by' => 'nullable|string|email',
            'verified_at' => 'nullable|date',
        ]);

        if (isset($validatedData['status']) && 
            ($validatedData['status'] === 'verified' || $validatedData['status'] === 'rejected')) {
            $validatedData['verified_at'] = now();
            $validatedData['verified_by'] = Auth::user()->email ?? 'system';
        }

        $donation->update($validatedData);

        return back()->with('success', 'Donation updated successfully.');
    }
    
    // ... (show and destroy methods can be added if needed, following the same Inertia/JSON return pattern)
}
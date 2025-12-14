<?php

namespace App\Http\Controllers;

use App\Models\Distribution;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        
        return Inertia::render('Staff/Dashboard', [
            'stats' => [
                'myDistributions' => Distribution::where('field_officer_name', $user->name)->count(),
                'pendingDistributions' => Distribution::where('field_officer_name', $user->name)->where('status', 'pending')->count(),
                'approvedDistributions' => Distribution::where('field_officer_name', $user->name)->where('status', 'approved')->count(),
                'totalBeneficiaries' => Distribution::where('field_officer_name', $user->name)->sum('beneficiary_count'),
            ],
            'recentDistributions' => Distribution::where('field_officer_name', $user->name)
                ->latest('distribution_date')
                ->take(5)
                ->get(),
        ]);
    }

    public function distributions()
    {
        $user = auth()->user();
        
        return Inertia::render('Staff/Distributions/Index', [
            'distributions' => Distribution::where('field_officer_name', $user->name)
                ->with('program')
                ->latest('distribution_date')
                ->get(),
        ]);
    }

    public function createDistribution()
    {
        return Inertia::render('Staff/Distributions/Create', [
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
            'beneficiary_count' => 'required|integer|min:1',
            'items_distributed' => 'nullable|integer',
            'items_list' => 'nullable|array',
            'total_amount' => 'nullable|numeric',
            'distribution_date' => 'required|date',
            'photo_urls' => 'nullable|array',
            'video_url' => 'nullable|url',
            'notes' => 'nullable|string',
        ]);

        $validated['field_officer_name'] = auth()->user()->name;
        $validated['status'] = 'pending';

        Distribution::create($validated);

        return redirect()->route('staff.distributions')->with('success', 'Distribution submitted for approval.');
    }
}

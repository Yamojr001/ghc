<?php

namespace App\Http\Controllers;

use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class VolunteerController extends Controller
{
    /**
     * Admin View - Volunteer application list.
     */
    public function index(Request $request)
    {
        $volunteers = $this->filterData($request, false);
        return Inertia::render('Admin/Volunteers', ['volunteers' => $volunteers]);
    }

    /**
     * Filter volunteer applications for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = Volunteer::query();

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }
        $query->orderBy('created_at', 'desc');

        $volunteers = $query->get();

        if ($returnJson) {
            return response()->json($volunteers);
        }
        return $volunteers;
    }

    /**
     * Store a newly created volunteer application in storage (Public Submission).
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:volunteers,email',
            'motivation' => 'required|string',
            // ... (rest of validation rules)
        ]);

        $validatedData['status'] = 'pending';

        $volunteer = Volunteer::create($validatedData);

        return response()->json($volunteer, 201);
    }

    /**
     * Update the specified volunteer application in storage.
     */
    public function update(Request $request, Volunteer $volunteer)
    {
        $validatedData = $request->validate([
            'status' => ['nullable', 'string', Rule::in(['pending', 'approved', 'active', 'inactive'])],
            'notes' => 'nullable|string',
            // ... (rest of update rules)
        ]);

        $volunteer->update($validatedData);

        return back()->with('success', 'Volunteer status updated successfully.');
    }
}
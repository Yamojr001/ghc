<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TeamMemberController extends Controller
{
    /**
     * Display the Team Member listing (Admin or Public).
     */
    public function index(Request $request)
    {
        // Default filter for public view: only active members
        $request->merge(['is_active' => true, 'sort' => 'display_order']); 
        $members = $this->filterData($request, false);
        return Inertia::render('Team/Index', ['members' => $members]);
    }

    /**
     * Filter team members for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = TeamMember::query();

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }
        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        $query->orderBy('display_order', 'asc')->orderBy('name', 'asc');

        $teamMembers = $query->get();

        if ($returnJson) {
            return response()->json($teamMembers);
        }
        return $teamMembers;
    }

    /**
     * Store a newly created team member in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            // ... (rest of validation rules)
        ]);

        $teamMember = TeamMember::create($validatedData);

        return response()->json($teamMember, 201);
    }

    /**
     * Update the specified team member in storage.
     */
    public function update(Request $request, TeamMember $teamMember)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            // ... (rest of validation rules)
        ]);

        $teamMember->update($validatedData);

        return back()->with('success', 'Team member updated successfully.');
    }

    /**
     * Remove the specified team member from storage.
     */
    public function destroy(TeamMember $teamMember)
    {
        $teamMember->delete();
        return back()->with('success', 'Team member deleted successfully.');
    }
}
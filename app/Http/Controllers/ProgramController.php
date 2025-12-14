<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProgramController extends Controller
{
    /**
     * Display the Program listing (Admin or Public).
     */
    public function index(Request $request)
    {
        // Default filter for public view: only active programs
        $request->merge(['is_active' => true]); 
        $programs = $this->filterData($request, false);
        return Inertia::render('Programs/Index', ['programs' => $programs]);
    }
    
    /**
     * Filter programs for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = Program::query();

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }
        if ($request->has('slug')) {
            $query->where('slug', $request->input('slug'));
        }

        $query->orderBy('display_order', 'asc')->orderBy('name', 'asc');

        $programs = $query->get();

        if ($returnJson) {
            return response()->json($programs);
        }
        return $programs;
    }

    /**
     * Store a newly created program in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'sometimes|string|unique:programs|max:255',
            'description' => 'nullable|string',
            // ... (rest of validation rules)
        ]);

        if (!isset($validatedData['slug'])) {
            $validatedData['slug'] = Str::slug($validatedData['name']);
        }

        $program = Program::create($validatedData);

        return response()->json($program, 201);
    }

    /**
     * Update the specified program in storage.
     */
    public function update(Request $request, Program $program)
    {
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'slug' => 'nullable|string|unique:programs,slug,' . $program->id . '|max:255',
            // ... (rest of validation rules)
        ]);

        $program->update($validatedData);

        return back()->with('success', 'Program updated successfully.');
    }

    /**
     * Remove the specified program from storage.
     */
    public function destroy(Program $program)
    {
        $program->delete();
        return back()->with('success', 'Program deleted successfully.');
    }
}
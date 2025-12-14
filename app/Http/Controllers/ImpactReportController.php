<?php

namespace App\Http\Controllers;

use App\Models\ImpactReport;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ImpactReportController extends Controller
{
    /**
     * Public View - Impact Reports Page.
     */
    public function index(Request $request)
    {
        // Filter for public view: only published reports
        $request->merge(['is_published' => true, 'sort' => '-year']); 
        $reports = $this->filterData($request, false);
        return Inertia::render('Reports/Index', ['reports' => $reports]);
    }
    
    /**
     * Filter impact reports for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = ImpactReport::query();

        if ($request->has('is_published')) {
            $query->where('is_published', $request->boolean('is_published'));
        }
        if ($request->has('year')) {
            $query->where('year', $request->input('year'));
        }
        
        $query->orderBy('year', 'desc')->orderBy('quarter', 'desc');

        $reports = $query->get();

        if ($returnJson) {
            return response()->json($reports);
        }
        return $reports;
    }

    /**
     * Store a newly created impact report in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'report_type' => ['required', 'string', Rule::in(['annual', 'quarterly', 'audit', 'financial', 'impact'])],
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 5),
            // ... (rest of validation rules)
        ]);

        $impactReport = ImpactReport::create($validatedData);

        return response()->json($impactReport, 201);
    }

    /**
     * Update the specified impact report in storage.
     */
    public function update(Request $request, ImpactReport $impactReport)
    {
        $validatedData = $request->validate([
            'title' => 'nullable|string|max:255',
            // ... (rest of update rules)
        ]);

        $impactReport->update($validatedData);

        return back()->with('success', 'Impact report updated successfully.');
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    /**
     * Display the Admin Expenses list Inertia page.
     */
    public function index(Request $request)
    {
        $expenses = $this->filterData($request, false);
        
        return Inertia::render('Admin/AdminExpenses', [
            'expenses' => $expenses,
            'filters' => $request->only('status', 'search'),
        ]);
    }

    /**
     * Filter expenses for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = Expense::query();

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }
        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        $query->orderBy('expense_date', 'desc')->orderBy('created_at', 'desc');

        $expenses = $query->get();

        if ($returnJson) {
            return response()->json($expenses);
        }
        return $expenses;
    }

    /**
     * Store a newly created expense in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => ['required', 'string', Rule::in([
                'program_delivery', 'supplies', 'logistics', 'staff',
                'admin', 'marketing', 'training', 'equipment', 'other'
            ])],
            'amount' => 'required|numeric|min:0.01',
            'currency' => 'nullable|string|in:USD,GBP,EUR,NGN',
            'expense_date' => 'required|date',
        ]);
        
        // Simplified USD conversion
        $validatedData['amount_usd'] = $validatedData['amount']; 
        $validatedData['status'] = 'pending';

        $expense = Expense::create($validatedData);

        return response()->json($expense, 201);
    }

    /**
     * Update the specified expense in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        $validatedData = $request->validate([
            'status' => ['nullable', 'string', Rule::in(['pending', 'approved', 'rejected'])],
            // ... (rest of update rules)
        ]);

        if (isset($validatedData['status']) && 
            ($validatedData['status'] === 'approved' || $validatedData['status'] === 'rejected')) {
            $validatedData['approved_at'] = now();
            $validatedData['approved_by'] = Auth::user()->email ?? 'system';
        }

        $expense->update($validatedData);

        return back()->with('success', 'Expense updated successfully.');
    }

    /**
     * Remove the specified expense from storage.
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();
        return back()->with('success', 'Expense deleted successfully.');
    }
}
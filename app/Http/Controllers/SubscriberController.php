<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    /**
     * Admin View - Subscriber list.
     */
    public function index(Request $request)
    {
        $subscribers = $this->filterData($request, false);
        return Inertia::render('Admin/Subscribers', ['subscribers' => $subscribers]);
    }
    
    /**
     * Filter subscribers for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = Subscriber::query();

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }
        $query->orderBy('created_at', 'desc');

        $subscribers = $query->get();

        if ($returnJson) {
            return response()->json($subscribers);
        }
        return $subscribers;
    }

    /**
     * Store a newly created subscriber in storage (Public Submission).
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email|unique:subscribers,email',
            'name' => 'nullable|string|max:255',
        ]);

        $validatedData['status'] = 'active';
        $validatedData['source'] = 'website';

        $subscriber = Subscriber::create($validatedData);

        return response()->json($subscriber, 201);
    }
    
    /**
     * Update the specified subscriber in storage.
     */
    public function update(Request $request, Subscriber $subscriber)
    {
        $validatedData = $request->validate([
            'email' => 'nullable|email|unique:subscribers,email,' . $subscriber->id,
            'status' => ['nullable', 'string', Rule::in(['active', 'unsubscribed'])],
        ]);

        $subscriber->update($validatedData);

        return back()->with('success', 'Subscriber updated successfully.');
    }
}
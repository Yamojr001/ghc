<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ContactMessageController extends Controller
{
    /**
     * Admin View - Message list.
     */
    public function index(Request $request)
    {
        $messages = $this->filterData($request, false);
        return Inertia::render('Admin/ContactMessages', ['messages' => $messages]);
    }

    /**
     * Filter contact messages for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = ContactMessage::query();

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }
        $query->orderBy('created_at', 'desc');

        $messages = $query->get();

        if ($returnJson) {
            return response()->json($messages);
        }
        return $messages;
    }

    /**
     * Store a newly created contact message in storage (Public Submission).
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
            'inquiry_type' => ['nullable', 'string', Rule::in(['general', 'donation', 'partnership', 'volunteer', 'media', 'other'])],
        ]);

        $contactMessage = ContactMessage::create($validatedData);

        return response()->json(['message' => 'Message sent successfully!'], 201);
    }

    /**
     * Update the specified contact message in storage.
     */
    public function update(Request $request, ContactMessage $contactMessage)
    {
        $validatedData = $request->validate([
            'status' => ['nullable', 'string', Rule::in(['new', 'in_progress', 'resolved'])],
            'response' => 'nullable|string',
            'assigned_to' => 'nullable|string|max:255',
        ]);

        if (isset($validatedData['status']) && ($validatedData['status'] === 'resolved' || $validatedData['status'] === 'in_progress')) {
            $validatedData['responded_at'] = now();
            if (!isset($validatedData['assigned_to']) && Auth::check()) {
                 $validatedData['assigned_to'] = Auth::user()->email;
            }
        }

        $contactMessage->update($validatedData);

        return back()->with('success', 'Message status updated.');
    }
}
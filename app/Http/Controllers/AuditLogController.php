<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AuditLogController extends Controller
{
    /**
     * Admin View - Audit Log list.
     */
    public function index(Request $request)
    {
        $auditLogs = $this->filterData($request, false); 

        return Inertia::render('Admin/AuditLogs', [
            'auditLogs' => $auditLogs,
            'filters' => $request->only(['user_email', 'action', 'entity_type']),
        ]);
    }

    /**
     * Filter audit logs for XHR/API calls.
     */
    public function filterData(Request $request, bool $returnJson = true)
    {
        $query = AuditLog::query();

        if ($request->has('user_email')) {
            $query->where('user_email', 'like', '%' . $request->input('user_email') . '%');
        }
        if ($request->has('action')) {
            $query->where('action', $request->input('action'));
        }
        // ... (rest of filtering logic from your original)

        $query->orderBy('created_at', 'desc');

        $auditLogs = $query->get();

        if ($returnJson) {
            return response()->json($auditLogs);
        }
        return $auditLogs;
    }

    /**
     * Store a newly created audit log in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'nullable|string|max:255',
            'user_email' => 'nullable|email|max:255',
            'action' => ['required', 'string', Rule::in(['create', 'update', 'delete', 'verify', 'approve', 'reject', 'login', 'export'])],
            'entity_type' => 'required|string|max:255',
            // ... (rest of validation rules)
        ]);

        $auditLog = AuditLog::create($validatedData);

        return response()->json($auditLog, 201);
    }
}
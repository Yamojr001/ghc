<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class StaffMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check() || !in_array(Auth::user()->role, ['staff', 'admin'])) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthorized. Staff access required.'], 403);
            }
            
            return redirect()->route('dashboard')->with('error', 'Staff access required.');
        }

        return $next($request);
    }
}
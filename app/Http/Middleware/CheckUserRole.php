<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // 1. Check if the user is authenticated (Sanctum will handle this)
        if (! $request->user()) {
            // Return 401 Unauthorized, which React client can catch.
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // 2. Check if the authenticated user's role matches the required role
        if ($request->user()->role !== $role) {
            // Return 403 Forbidden
            return response()->json(['message' => 'Access Forbidden. Insufficient role.'], 403);
        }

        return $next($request);
    }
}
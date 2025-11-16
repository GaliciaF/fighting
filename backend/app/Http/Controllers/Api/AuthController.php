<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register
    public function register(Request $request)
    {
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role ?? 'user',
        ]);

        return response()->json([
            'message' => 'Registered successfully',
            'user' => $user
        ], 201);
    }

    // Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            // security_answer optional for normal users
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // Only admin/staff need to answer favorite color
        if (in_array($user->role, ['admin', 'staff'])) {
            if (! $request->security_answer || strtolower($user->security_answer) !== strtolower($request->security_answer)) {
                return response()->json(['error' => 'Security question failed'], 401);
            }
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
        ]);
    }
}

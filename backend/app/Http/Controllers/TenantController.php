<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TenantController extends Controller
{
    public function index()
    {
        return Tenant::with('room', 'user')->get()->map(function ($tenant) {
            $tenant->profile_image_url = $tenant->profile_image
                ? asset('storage/' . $tenant->profile_image)
                : asset('images/default-avatar.png');
            return $tenant;
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'full_name' => 'required|string|max:255',
            'contact' => 'required|string|max:20',
            'move_in_date' => 'required|date',
            'profile_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('profile_image')) {
            $validated['profile_image'] = $request->file('profile_image')->store('tenant_images', 'public');
        }

        $tenant = Tenant::create($validated);

        $tenant->profile_image_url = $tenant->profile_image
            ? asset('storage/' . $tenant->profile_image)
            : asset('images/default-avatar.png');

        return response()->json($tenant, 201);
    }

    public function show(Tenant $tenant)
    {
        $tenant->load('room', 'user');
        $tenant->profile_image_url = $tenant->profile_image
            ? asset('storage/' . $tenant->profile_image)
            : asset('images/default-avatar.png');
        return $tenant;
    }

    public function update(Request $request, Tenant $tenant)
    {
        $validated = $request->validate([
            'full_name' => 'sometimes|string|max:255',
            'contact' => 'sometimes|string|max:20',
            'move_in_date' => 'sometimes|date',
            'profile_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle image update
        if ($request->hasFile('profile_image')) {
            // Delete old image if exists
            if ($tenant->profile_image && Storage::disk('public')->exists($tenant->profile_image)) {
                Storage::disk('public')->delete($tenant->profile_image);
            }

            $validated['profile_image'] = $request->file('profile_image')->store('tenant_images', 'public');
        }

        $tenant->update($validated);

        $tenant->profile_image_url = $tenant->profile_image
            ? asset('storage/' . $tenant->profile_image)
            : asset('images/default-avatar.png');

        return response()->json($tenant);
    }

    public function destroy(Tenant $tenant)
    {
        // Delete stored image
        if ($tenant->profile_image && Storage::disk('public')->exists($tenant->profile_image)) {
            Storage::disk('public')->delete($tenant->profile_image);
        }

        $tenant->delete();
        return response()->noContent();
    }
}

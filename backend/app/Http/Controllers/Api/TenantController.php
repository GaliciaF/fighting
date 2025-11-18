<?php 

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TenantController extends Controller
{
    public function index()
    {
        return Tenant::with('room', 'payments')->get();
    }

public function store(Request $request)
{
    $tenant = Tenant::create([
        'name' => $request->name,
        'email' => $request->email,
        'phone' => $request->phone,
        'room_id' => $request->room_id, // make sure the frontend uses room_id
    ]);

    return response()->json($tenant, 201);

    }

    public function show(Tenant $tenant)
    {
        return $tenant->load('room', 'payments');
    }

    public function update(Request $request, Tenant $tenant)
    {
        // Update basic fields
        $tenant->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'room_id' => $request->room_id,
        ]);

        // Handle profile picture if uploaded
        if ($request->hasFile('profilePic')) {
            // Optionally delete old profile pic
            if ($tenant->profilePic) {
                Storage::disk('public')->delete($tenant->profilePic);
            }

            $path = $request->file('profilePic')->store('profile_pics', 'public');
            $tenant->profilePic = $path;
            $tenant->save();
        }

        return response()->json($tenant);
    }

    public function destroy(Tenant $tenant)
    {
        // Optionally delete profile pic
        if ($tenant->profilePic) {
            Storage::disk('public')->delete($tenant->profilePic);
        }

        $tenant->delete();
        return response()->json(null, 204);
    }

    public function getByEmail($email) 
    {
        $tenant = Tenant::where('email', $email)->firstOrFail();
        return response()->json($tenant);
    }
}

<?php 

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\Room; // import Room model
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
        // Create tenant
        $tenant = Tenant::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'room_id' => $request->room_id,
        ]);

        // Update room capacity/status
        $room = Room::with('tenants')->find($request->room_id);

        if ($room) {
            $tenantCount = $room->tenants->count(); // current number of tenants

            if ($tenantCount >= $room->capacity) {
                $room->status = 'Full';
            } elseif ($tenantCount > 0) {
                $room->status = 'Occupied';
            } else {
                $room->status = 'Available';
            }

            $room->save();
        }

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
            if ($tenant->profilePic) {
                Storage::disk('public')->delete($tenant->profilePic);
            }

            $path = $request->file('profilePic')->store('profile_pics', 'public');
            $tenant->profilePic = $path;
            $tenant->save();
        }

        // Update room status (optional: handle if tenant moved rooms)
        $this->updateRoomStatus($tenant->room_id);

        return response()->json($tenant);
    }

    private function updateRoomStatus($roomId)
    {
        $room = Room::with('tenants')->find($roomId);
        if ($room) {
            $tenantCount = $room->tenants->count();
            if ($tenantCount >= $room->capacity) {
                $room->status = 'Full';
            } elseif ($tenantCount > 0) {
                $room->status = 'Occupied';
            } else {
                $room->status = 'Available';
            }
            $room->save();
        }
    }

    public function destroy(Tenant $tenant)
    {
        if ($tenant->profilePic) {
            Storage::disk('public')->delete($tenant->profilePic);
        }

        $roomId = $tenant->room_id;
        $tenant->delete();

        // Update room status after deleting tenant
        $this->updateRoomStatus($roomId);

        return response()->json(null, 204);
    }

    public function getByEmail($email) 
    {
        $tenant = Tenant::where('email', $email)->firstOrFail();
        return response()->json($tenant);
    }
}

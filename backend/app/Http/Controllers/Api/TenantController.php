<?php 

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\Room;
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
        // Validate input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:tenants,email',
            'phone' => 'required|string|max:20',
            'room_id' => 'required|exists:rooms,id',
        ]);

        // Fetch the room with tenants
        $room = Room::with('tenants')->find($validated['room_id']);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        // Prevent adding tenant if room is full
        if ($room->tenants->count() >= $room->capacity) {
            return response()->json([
                'message' => 'Cannot add tenant. Room is already full.'
            ], 400);
        }

        // Create tenant
        $tenant = Tenant::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'room_id' => $validated['room_id'],
        ]);

        // Update room status after adding tenant
        $this->updateRoomStatus($room->id);

        return response()->json($tenant, 201);
    }

    public function show(Tenant $tenant)
    {
        return $tenant->load('room', 'payments');
    }

    public function update(Request $request, Tenant $tenant)
    {
        // Validate input
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:tenants,email,' . $tenant->id,
            'phone' => 'sometimes|required|string|max:20',
            'room_id' => 'sometimes|required|exists:rooms,id',
        ]);

        // Fetch new room if changing
        if (isset($validated['room_id'])) {
            $room = Room::with('tenants')->find($validated['room_id']);

            if (!$room) {
                return response()->json(['message' => 'Room not found'], 404);
            }

            // Check capacity if moving tenant to a new room
            if ($room->tenants->count() >= $room->capacity && $room->id != $tenant->room_id) {
                return response()->json([
                    'message' => 'Cannot move tenant. Target room is full.'
                ], 400);
            }
        }

        // Update tenant fields
        $tenant->update($validated);

        // Handle profile picture if uploaded
        if ($request->hasFile('profilePic')) {
            if ($tenant->profilePic) {
                Storage::disk('public')->delete($tenant->profilePic);
            }

            $path = $request->file('profilePic')->store('profile_pics', 'public');
            $tenant->profilePic = $path;
            $tenant->save();
        }

        // Update old and new room status
        $this->updateRoomStatus($tenant->room_id);
        if (isset($room) && $room->id != $tenant->room_id) {
            $this->updateRoomStatus($room->id);
        }

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

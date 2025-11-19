<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    // Get all rooms
    public function index()
    {
        return Room::with('tenants')->get();
    }

    // Create room
    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'room_number' => 'required|string|max:255',
            'room_type'        => 'required|string|max:255',
            'rate'       => 'required|numeric|min:0',
            'status'      => 'required|string',
            'capacity'    => 'sometimes|integer|min:1',
        ]);

        // Create new room
        $room = Room::create([
            'room_number' => $validated['room_number'],
            'room_type'   => $validated['room_type'],
            'rate'        => $validated['rate'],
            'status'      => $validated['status'],
            'capacity'    => $validated['capacity'] ?? 1,
        ]);

        return response()->json($room, 201);
    }

    // Show room
    public function show(Room $room)
    {
        return $room;
    }

    // Update room
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'room_number' => 'sometimes|required|string|max:255',
            'room_type'        => 'sometimes|required|string|max:255',
            'rate'       => 'sometimes|required|numeric|min:0',
            'status'      => 'sometimes|required|string',
            'capacity'    => 'sometimes|integer|min:1',
        ]);

        // Update only fields that exist in the request
        $room->update([
            'room_number' => $validated['room_number'] ?? $room->room_number,
            'room_type'   => $validated['room_type'] ?? $room->room_type,
            'rate'        => $validated['rate'] ?? $room->rate,
            'capacity'    => $validated['capacity'] ?? $room->capacity,
        ]);

        // Recalculate status based on current tenants and new capacity
        $tenantCount = $room->tenants()->count();

        if ($tenantCount >= $room->capacity) {
            $room->status = 'Full';
        } elseif ($tenantCount > 0) {
            $room->status = 'Occupied';
        } else {
            $room->status = 'Available';
        }

        $room->save();

        return response()->json($room, 200);
    }

    // Delete room
    public function destroy(Room $room)
    {
        $room->delete();
        return response()->json(null, 204);
    }
    
}

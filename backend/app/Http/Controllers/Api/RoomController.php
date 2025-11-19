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
          // Get the room first
    $room = Room::with('tenants')->find($request->room_id);

    if (!$room) {
        return response()->json(['message' => 'Room not found'], 404);
    }

    // Check if room is already full
    if ($room->tenants->count() >= $room->capacity) {
        return response()->json(['message' => 'Cannot add tenant: room is full'], 400);
    }
        $validated = $request->validate([
            'room_number' => 'required|string|max:255',
            'type'       => 'required|string|max:255',
            'price'      => 'required|numeric|min:0',
            'status'     => 'required|string',
            'capacity'   => 'sometimes|integer|min:1',
        ]);

        $room = Room::create([
            'room_number' => $validated['room_number'],
            'room_type'   => $validated['type'],
            'rate'        => $validated['price'],
            'status'      => $validated['status'],
            'capacity'    => $validated['capacity'],
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
            'type'       => 'sometimes|required|string|max:255',
            'price'      => 'sometimes|required|numeric|min:0',
            'status'     => 'sometimes|required|string',
            'capacity'   => 'sometimes|integer|min:1',
        ]);

        // Update only fields that exist in the request
        $room->update([
            'room_number' => $validated['room_number'] ?? $room->room_number,
            'room_type'   => $validated['type'] ?? $room->room_type,
            'rate'        => $validated['price'] ?? $room->rate,
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

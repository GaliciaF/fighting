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
        return Room::all();
    }

    // Create room
    public function store(Request $request)
    {
        // Validate based on React inputs
        $validated = $request->validate([
            'roomNumber' => 'required|string|max:255',
            'type'       => 'required|string|max:255',
            'price'      => 'required|numeric|min:0',
            'status'     => 'required|string',
            'capacity'   => 'sometimes|integer|min:1',
        ]);

        // Convert React fields → database fields
        $room = Room::create([
            'room_number' => $validated['roomNumber'],
            'room_type'   => $validated['type'],
            'rate'        => $validated['price'],
            'status'      => $validated['status'],
            'capacity'    => 6,
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
            'roomNumber' => 'sometimes|required|string|max:255',
            'type'       => 'sometimes|required|string|max:255',
            'price'      => 'sometimes|required|numeric|min:0',
            'status'     => 'sometimes|required|string',
        ]);

        // Update only fields that exist in the request
        $room->update([
            'room_number' => $validated['roomNumber'] ?? $room->room_number,
            'room_type'   => $validated['type'] ?? $room->room_type,
            'rate'        => $validated['price'] ?? $room->rate,
            'status'      => $validated['status'] ?? $room->status,
        ]);

        return response()->json($room, 200);
    }

    // Delete room
    public function destroy(Room $room)
    {
        $room->delete();
        return response()->json(null, 204);
    }
}

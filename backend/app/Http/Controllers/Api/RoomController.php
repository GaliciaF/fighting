<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    // List all rooms
    public function index()
    {
        return Room::all();
    }

    // Create a new room with validation
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        return Room::create($validated);
    }

    // Show a single room
    public function show(Room $room)
    {
        return $room;
    }

    // Update an existing room with validation
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'capacity' => 'sometimes|required|integer|min:1',
            'price' => 'sometimes|required|numeric|min:0',
        ]);

        $room->update($validated);
        return $room;
    }

    // Delete a room
    public function destroy(Room $room)
    {
        $room->delete();
        return response()->json(null, 204);
    }
}

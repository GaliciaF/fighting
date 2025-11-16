<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index() {
        return Room::all();
    }

    public function store(Request $request) {
        $room = Room::create($request->all());
        return response()->json($room, 201);
    }

    public function show(Room $room) {
        return $room;
    }

    public function update(Request $request, Room $room) {
        $room->update($request->all());
        return response()->json($room);
    }

    public function destroy(Room $room) {
        $room->delete();
        return response()->json(null, 204);
    }
}

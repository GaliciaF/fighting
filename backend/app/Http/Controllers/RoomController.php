<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller {
    public function index() {
        return Room::all();
    }

    public function store(Request $request) {
        $request->validate([
            'room_number' => 'required|unique:rooms',
            'type' => 'required',
            'capacity' => 'required|integer',
            'rent_amount' => 'required|numeric',
        ]);
        return Room::create($request->all());
    }

    public function show(Room $room) {
        return $room;
    }

    public function update(Request $request, Room $room) {
        $room->update($request->all());
        return $room;
    }

    public function destroy(Room $room) {
        $room->delete();
        return response()->noContent();
    }
}
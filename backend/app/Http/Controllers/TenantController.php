<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;

class TenantController extends Controller {
    public function index() {
        return Tenant::with('room', 'user')->get();
    }

    public function store(Request $request) {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'full_name' => 'required',
            'contact' => 'required',
            'move_in_date' => 'required|date',
        ]);
        return Tenant::create($request->all());
    }

    public function show(Tenant $tenant) {
        return $tenant->load('room', 'user');
    }

    public function update(Request $request, Tenant $tenant) {
        $tenant->update($request->all());
        return $tenant;
    }

    public function destroy(Tenant $tenant) {
        $tenant->delete();
        return response()->noContent();
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    public function index()
    {
        return Tenant::with('room', 'payments')->get();
    }

    public function store(Request $request)
    {
        $tenant = Tenant::create($request->all());
        return response()->json($tenant, 201);
    }

    public function show(Tenant $tenant)
    {
        return $tenant->load('room', 'payments');
    }

    public function update(Request $request, Tenant $tenant)
    {
        $tenant->update($request->all());
        return response()->json($tenant);
    }

    public function destroy(Tenant $tenant)
    {
        $tenant->delete();
        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        // Fetch payments with tenant relationship
        $payments = Payment::with('tenant:id,name')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'tenant_id' => $p->tenant_id, // Added tenant_id
                    'tenant_name' => $p->tenant->name ?? 'Unknown Tenant',
                    'amount' => $p->amount,
                    'date' => $p->payment_date, // frontend expects "date"
                    'status' => $p->status,
                ];
            });

        return response()->json($payments);
    }

    public function store(Request $request)
    {
        $payment = Payment::create($request->all());
        return response()->json($payment, 201);
    }

    public function show(Payment $payment)
    {
        return $payment->load('tenant.room');
    }

    public function update(Request $request, Payment $payment)
    {
        $payment->update($request->all());
        return response()->json($payment);
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return response()->json(null, 204);
    }
}

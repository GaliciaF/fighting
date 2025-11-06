<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller {
    public function index() {
        return Payment::with('tenant')->get();
    }

    public function store(Request $request) {
        $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
        ]);
        return Payment::create($request->all());
    }

    public function show(Payment $payment) {
        return $payment->load('tenant');
    }

    public function update(Request $request, Payment $payment) {
        $payment->update($request->all());
        return $payment;
    }

    public function destroy(Payment $payment) {
        $payment->delete();
        return response()->noContent();
    }
}
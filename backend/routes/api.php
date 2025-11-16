<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\TenantController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::apiResource('/rooms', RoomController::class);
Route::apiResource('/tenants', TenantController::class);
Route::apiResource('/payments', PaymentController::class);

Route::get('/test', function () {
    return response()->json(['message' => 'Laravel 12 API working!']);
});

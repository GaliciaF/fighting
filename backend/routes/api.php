<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\TenantController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\AuthController;

use App\Http\Controllers\Api\AnnouncementController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/announcements', [AnnouncementController::class, 'index']);
    Route::post('/announcements', [AnnouncementController::class, 'store']);
    Route::get('/announcements/{id}', [AnnouncementController::class, 'show']);
    Route::put('/announcements/{id}', [AnnouncementController::class, 'update']);
    Route::delete('/announcements/{id}', [AnnouncementController::class, 'destroy']);
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::apiResource('/rooms', RoomController::class);
Route::apiResource('/tenants', TenantController::class);
Route::get('/tenant/email/{email}', [TenantController::class, 'getByEmail']);
Route::get('/tenants/{tenant}', [TenantController::class, 'show']);
Route::post('/tenants/{tenant}', [TenantController::class, 'update']);

Route::apiResource('/payments', PaymentController::class);

Route::get('/test', function () {
    return response()->json(['message' => 'Laravel 12 API working!']);
});

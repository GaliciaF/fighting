<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',   // foreign key
        'amount',
        'payment_date',
        'status',      // paid, pending, overdue
    ];

    // Payment belongs to a tenant
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    // Optional: access the room through tenant
    public function room()
    {
        return $this->hasOneThrough(Room::class, Tenant::class, 'id', 'id', 'tenant_id', 'room_id');
    }
}

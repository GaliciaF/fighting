<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'room_id', // foreign key
        'status',  // active, inactive, etc.
    ];

    // Tenant belongs to a room
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    // Tenant has many payments
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}

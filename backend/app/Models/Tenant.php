<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'room_id', // foreign key
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

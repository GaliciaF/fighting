<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model {
    use HasFactory;

    protected $fillable = ['user_id', 'room_id', 'full_name', 'contact', 'move_in_date'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function room() {
        return $this->belongsTo(Room::class);
    }

    public function payments() {
        return $this->hasMany(Payment::class);
    }
}
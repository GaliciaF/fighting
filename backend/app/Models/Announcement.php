<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',       // announcement title
        'content',     // announcement content
        'posted_by',   // user_id of admin/staff who posted
        'posted_at',   // date/time of posting
    ];

    // Optional: announcement belongs to a user (admin/staff)
    public function user()
    {
        return $this->belongsTo(User::class, 'posted_by');
    }
}

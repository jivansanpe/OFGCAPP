<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Piece extends Model
{
    use HasFactory;

    protected $fillable = ['author_id', 'name', 'description', 'selected_event_ids'];

    public function events()
    {
        return $this->belongsToMany(Event::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}


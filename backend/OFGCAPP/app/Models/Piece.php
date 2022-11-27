<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Piece extends Model
{
    use HasFactory;
    protected $fillable = ['event_id', 'author_id','name', 'description'];
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
    public function author()
    {
        return $this->belongsTo(Author::class);
    }
}

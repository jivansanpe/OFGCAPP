<?php

namespace App\Models;
use App\Http\Controllers\Api\EventController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'image', 'description', 'date', 'category', 'musician_id', 'link', 'status'];
    public function pieces()
    {
        return $this->hasMany(Piece::class);
    }
    public function musician()
    {
        return $this->belongsTo(Musician::class);
    }
}

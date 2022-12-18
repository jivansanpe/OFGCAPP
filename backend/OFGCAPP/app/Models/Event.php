<?php

namespace App\Models;
use App\Http\Controllers\Api\EventController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'date', 'category'];
    public function pieces()
    {
        return $this->hasMany(Piece::class);
    }
    public function musicians()
    {
        return $this->belongsToMany(Musician::class)->withPivot('category');
    }
}

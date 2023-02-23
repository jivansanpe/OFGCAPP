<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Musician extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];
    public function events()
    {
        return $this->belongsToMany(Event::class);
    }
    
}

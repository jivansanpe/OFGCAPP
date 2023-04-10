<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Musician extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'image', 'description'];
    public function events()
    {
        return $this->hasMany(Event::class);
    }
}

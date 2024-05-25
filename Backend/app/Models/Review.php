<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'property_id', 'content', 'rate', 'date'];
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}

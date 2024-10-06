<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory, HasUlids;

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function bugs()
    {
        return $this->hasMany(Bug::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory, HasUlids;

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function bugs()
    {
        return $this->hasManyThrough(Bug::class, Project::class, 'company_id', 'project_id');
    }
}

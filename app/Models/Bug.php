<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bug extends Model
{
    use HasFactory, HasUlids;

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function reported_by()
    {
        return $this->belongsTo(Customer::class, 'reported_by_id');
    }

    public function company()
    {
        return $this->hasOneThrough(Company::class, Project::class, 'id', 'id', 'project_id', 'company_id');
    }
}

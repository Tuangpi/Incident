<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Customer;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $company_count = Company::count();
        $project_count = Project::count();
        $customer_count = Customer::count();
        $employee_count = User::count();

        return response()->json([
            'company_count' => $company_count,
            'project_count' => $project_count,
            'customer_count' => $customer_count,
            'employee_count' => $employee_count
        ]);
    }

    public function customerIndex()
    {
        $projects = Project::select('id', 'name', 'updated_at')
            ->where('company_id', Auth::guard('customer')->user()->company_id)
            ->withCount([
                'bugs as total_bugs',
                'bugs as open_bugs_count' => function ($query) {
                    $query->where('status', 'OPEN');
                },
                'bugs as resolved_bugs_count' => function ($query) {
                    $query->where('status', 'RESOLVED');
                }
            ])
            ->with('bugs:id,project_id,status,progress')
            ->get();

        return response()->json($projects);
    }
}

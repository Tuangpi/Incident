<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Customer;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

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
}

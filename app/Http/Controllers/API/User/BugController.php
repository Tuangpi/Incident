<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\Bug;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BugController extends Controller
{
    public function index(Request $request)
    {
        $company = $request->company;
        $project = $request->project;
        $bugType = $request->bugType;
        $status = $request->status;
        $severity = $request->severity;
        $priority = $request->priority;
        $employee = $request->employee;

        $bugs = Bug::when($company !== "all", function ($q) use ($company) {
            $q->whereHas('project', function ($query) use ($company) {
                $query->where('company_id', $company);
            });
        })->when($project !== "all", function ($q) use ($project) {
            $q->where('project_id', $project);
        })->when($bugType !== "all", function ($q) use ($bugType) {
            $q->where('bug_types_id', $bugType);
        })->when($status !== "all", function ($q) use ($status) {
            $q->where('status', $status);
        })->when($severity !== "all", function ($q) use ($severity) {
            $q->where('severity', $severity);
        })->when($priority !== "all", function ($q) use ($priority) {
            $q->where('priority', $priority);
        })->when($employee !== "all", function ($q) use ($employee) {
            $q->where('assigned_to_id', $employee);
        })->with((['project:id,name', 'reported_by:id,email']))
            ->get();

        return response()->json($bugs);
    }

    public function create(Request $request)
    {
        $inputs = Validator::make($request->all(), [
            'companyId' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $customer = new Bug();
        $customer->company_id = $request->companyId;
        $customer->save();

        return response()->json(['message' => 'Bug created successfully']);
    }

    public function get_bug($id)
    {
        $bug = Bug::findOrFail($id);
        return response()->json($bug);
    }

    public function update(Request $request, $id)
    {
        $inputs = Validator::make($request->all(), [
            'companyId' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $customer = Bug::findOrFail($id);
        $customer->company_id = $request->companyId;
        $customer->save();

        return response()->json(['message' => 'bug updated successfully']);
    }

    public function delete($id)
    {
        $bug = Bug::findOrFail($id);
        $bug->delete();
        return response()->json(['message' => 'Bug deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with(['company'])->get();
        return response()->json($projects);
    }

    public function create(Request $request)
    {
        $inputs = Validator::make($request->all(), [
            'companyId' => 'required',
            'name' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $project = new Project();
        $project->company_id = $request->companyId;
        $project->name = $request->name;
        $project->description = $request->description;

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logo_name = time() . "_" . $logo->getClientOriginalName();
            if (!Storage::exists('uploads/projectLogo')) {
                Storage::makeDirectory('uploads/projectLogo');
            }

            $logo->storeAs('uploads/projectLogo', $logo_name);

            $project->logo = $logo_name;
        }

        $project->save();

        return response()->json(['message' => 'Project created successfully']);
    }

    public function get_project($id)
    {
        $project = Project::findOrFail($id);
        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        $inputs = Validator::make($request->all(), [
            'companyId' => 'required',
            'name' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $project = Project::findOrFail($id);
        $project->company_id = $request->companyId;
        $project->name = $request->name;
        $project->description = $request->description;

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logo_name = time() . "_" . $logo->getClientOriginalName();
            if (!Storage::exists('uploads/projectLogo')) {
                Storage::makeDirectory('uploads/projectLogo');
            }

            $logo->storeAs('uploads/projectLogo', $logo_name);

            $project->logo = $logo_name;
        }

        $project->save();

        return response()->json(['message' => 'Project updated successfully']);
    }

    public function delete($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully']);
    }
}

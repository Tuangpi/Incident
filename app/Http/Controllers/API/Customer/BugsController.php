<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Models\Bug;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BugsController extends Controller
{
    public function index($projectId)
    {
        $bugs = Bug::when($projectId !== "all", function ($q, $projectId) {
            $q->where('project_id', $projectId);
        })->get();

        return response()->json($bugs);
    }

    public function create(Request $request)
    {
        $inputs = Validator::make($request->all(), [
            'project_id' => 'required',
            'title' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $bug = new Bug();
        $bug->title = $request->title;
        $bug->link = $request->link;
        $bug->description = $request->description;
        $bug->status = $request->status;
        $bug->severity = $request->severity;
        $bug->priority = $request->priority;
        $bug->reported_by_id = Auth::guard('customer')->user()->id;
        $bug->project_id = $request->project_id;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $file_name = time() . "_" . $file->getClientOriginalName();
            if (!Storage::exists('uploads/bugFiles')) {
                Storage::makeDirectory('uploads/bugFiles');
            }

            $file->storeAs('uploads/bugFiles', $file_name);

            $bug->file = $file_name;
        }

        $bug->save();

        return response()->json($bug);
    }

    public function show($id)
    {
        $bug = Bug::where('id', $id)->first();
        if ($bug) {
            return response()->json($bug);
        }
    }

    public function edit($id)
    {
        $bug = Bug::where('id', $id)->first();
        if ($bug) {
            return response()->json($bug);
        }
    }

    public function update(Request $request, $id)
    {
        $inputs = Validator::make($request->all(), [
            'title' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $bug = Bug::findOrFail($id);
        $bug->title = $request->title;
        $bug->link = $request->link;
        $bug->description = $request->description;
        $bug->status = $request->status;
        $bug->severity = $request->severity;
        $bug->priority = $request->priority;
        $bug->reported_by_id = Auth::guard('customer')->user()->id;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $file_name = time() . "_" . $file->getClientOriginalName();
            if (!Storage::exists('uploads/bugFiles')) {
                Storage::makeDirectory('uploads/bugFiles');
            }

            $file->storeAs('uploads/bugFiles', $file_name);

            $bug->file = $file_name;
        }

        $bug->save();

        return response()->json($bug);
    }

    public function delete($id)
    {
        $bug = Bug::where('id', $id)->first();
        if ($bug) {
            $bug->delete();
            return response()->json(['message' => 'Bug removed successfully']);
        }
    }
}

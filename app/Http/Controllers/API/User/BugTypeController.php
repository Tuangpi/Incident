<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\BugType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BugTypeController extends Controller
{
    public function index()
    {
        $bug_types = BugType::all();
        return response()->json($bug_types);
    }

    public function create(Request $request)
    {
        $inputs = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $bug_types = new BugType();
        $bug_types->name = $request->name;
        $bug_types->save();

        return response()->json(['message' => 'Bug Type created successfully']);
    }

    public function get_bug_type($id)
    {
        $bug_type = BugType::findOrFail($id);
        return response()->json($bug_type);
    }

    public function update(Request $request, $id)
    {
        $inputs = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $bug_types = BugType::findOrFail($id);
        $bug_types->name = $request->name;
        $bug_types->save();

        return response()->json(['message' => 'Bug Type updated successfully']);
    }

    public function delete($id)
    {
        $bug_types = BugType::findOrFail($id);
        $bug_types->delete();
        return response()->json(['message' => 'Bug Type deleted successfully']);
    }
}

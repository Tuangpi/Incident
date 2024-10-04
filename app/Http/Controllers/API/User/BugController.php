<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\Bug;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BugController extends Controller
{
    public function index()
    {
        $bugs = Bug::with(['project' => function ($q) {
            $q->select('id', 'name');
        }, 'reported_by' => function ($q) {
            $q->select('id', 'email');
        }])->get();
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

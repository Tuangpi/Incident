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
        $bugs = Bug::all();
        return response()->json($bugs);
    }

    public function create(Request $request)
    {
        $inputs = Validator::make($request->all(), [
            'companyId' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $customer = new Customer();
        $customer->company_id = $request->companyId;
        $customer->email = $request->email;
        $customer->email_verified_at = now();
        $customer->password = Hash::make($request->password);
        $customer->save();

        return response()->json(['message' => 'Customer created successfully']);
    }

    public function update(Request $request, $id)
    {
        $inputs = Validator::make($request->all(), [
            'companyId' => 'required',
            'email' => 'required|email',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $customer = Customer::findOrFail($id);
        $customer->company_id = $request->companyId;
        $customer->email = $request->email;
        if ($request->password) {
            $customer->password = Hash::make($request->password);
        }
        $customer->save();

        return response()->json(['message' => 'Customer updated successfully']);
    }

    public function delete($id)
    {
        $bug = Bug::findOrFail($id);
        $bug->delete();
        return response()->json(['message' => 'Bug deleted successfully']);
    }
}

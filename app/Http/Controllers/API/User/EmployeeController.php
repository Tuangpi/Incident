<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = User::all();
        return response()->json($employees);
    }

    public function create(Request $request)
    {
        $inputs = Validator::make($request->all(), [
            'email' => 'required|email',
            'name' => 'required',
            'password' => 'required',
            'role' => 'required'
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $employee = new User();
        $employee->email = $request->email;
        $employee->name = $request->name;
        $employee->email = $request->email;
        $employee->role = $request->role;
        $employee->email_verified_at = now();
        $employee->password = Hash::make($request->password);
        $employee->save();

        return response()->json(['message' => 'Employee created successfully']);
    }

    public function update(Request $request, $id)
    {
        $inputs = Validator::make($request->all(), [
            'email' => 'required|email',
            'name' => 'required',
            'role' => 'required'
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $employee = User::findOrFail($id);
        $employee->email = $request->email;
        $employee->name = $request->name;
        $employee->role = $request->role;

        if ($request->password) {
            $employee->password = Hash::make($request->password);
        }
        $employee->save();

        return response()->json(['message' => 'Employee updated successfully']);
    }

    public function delete($id)
    {
        $employee = User::findOrFail($id);
        $employee->delete();
        return response()->json(['message' => 'Employee deleted successfully']);
    }
}

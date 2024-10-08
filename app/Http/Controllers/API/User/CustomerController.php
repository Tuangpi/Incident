<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        return response()->json($customers);
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

    public function get_customer($id)
    {
        $customer = Customer::findOrFail($id);
        return response()->json($customer);
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
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return response()->json(['message' => 'Customer deleted successfully']);
    }
}

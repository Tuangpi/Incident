<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CustomerAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($credentials->fails()) {
            return response()->json(['message' => $credentials->errors()], 422);
        }

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $customer->role = "customer";

        return response()->json([
            'customer' => $customer,
            'token' => $customer->createToken('incident_customer')->plainTextToken
        ]);
    }

    public function logout(Request $request)
    {
        $customer = Auth::guard('customer')->user();
        $customer->tokens()->delete();
        return response()->noContent();
    }
}

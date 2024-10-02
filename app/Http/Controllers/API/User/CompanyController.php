<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::all();
        return response()->json($companies);
    }

    public function create(Request $request)
    {
        $inputs = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $company = new Company();
        $company->name = $request->name;
        $company->address = $request->address;

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logo_name = time() . "_" . $logo->getClientOriginalName();
            if (!Storage::exists('uploads/companyLogo')) {
                Storage::makeDirectory('uploads/companyLogo');
            }

            $logo->storeAs('uploads/companyLogo', $logo_name);

            $company->logo = $logo_name;
        }

        $company->save();

        return response()->json(['message' => 'Company created successfully']);
    }

    public function update(Request $request, $id)
    {
        $inputs = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($inputs->fails()) {
            return response()->json(['message' => $inputs->errors()], 422);
        }

        $company = Company::findOrFail($id);
        $company->name = $request->name;
        $company->address = $request->address;

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logo_name = time() . "_" . $logo->getClientOriginalName();
            if (!Storage::exists('public/uploads/companyLogo')) {
                Storage::makeDirectory('public/uploads/companyLogo');
            }

            $logo->storeAs('public/uploads/companyLogo', $logo_name);

            $company->logo = $logo_name;
        }

        $company->save();

        return response()->json(['message' => 'Company updated successfully']);
    }

    public function delete($id)
    {
        $company = Company::findOrFail($id);
        $company->delete();
        return response()->json(['message' => 'Company deleted successfully']);
    }
}

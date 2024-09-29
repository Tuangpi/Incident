<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BugsController extends Controller
{
    public function index()
    {
        return response()->json("good");
    }
}

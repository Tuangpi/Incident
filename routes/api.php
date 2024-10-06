<?php

use App\Http\Controllers\API\Auth\CustomerAuthController;
use App\Http\Controllers\API\Auth\UserAuthController;
use App\Http\Controllers\API\Customer\BugsController;
use App\Http\Controllers\API\Customer\ProjectController as CustomerProjectController;
use App\Http\Controllers\API\User\BugController;
use App\Http\Controllers\API\User\BugTypeController;
use App\Http\Controllers\API\User\CompanyController;
use App\Http\Controllers\API\User\CustomerController;
use App\Http\Controllers\API\User\DashboardController;
use App\Http\Controllers\API\User\EmployeeController;
use App\Http\Controllers\API\User\ProjectController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')->group(function () {
    Route::post('/login', [CustomerAuthController::class, 'login']);

    Route::group(['middleware' => ['auth.customer']], function () {
        Route::get("/dashboard", [DashboardController::class, 'customerIndex']);

        Route::prefix('project')->group(function () {
            Route::get("/index", [CustomerProjectController::class, 'index']);
        });

        Route::prefix('bug')->group(function () {
            Route::get('/{projectId}', [BugsController::class, 'index']);
            Route::post('/create', [BugsController::class, 'create']);
            Route::get('/show/{id}', [BugsController::class, 'show']);
            Route::get('/edit/{id}', [BugsController::class, 'edit']);
            Route::post('/update/{id}', [BugsController::class, 'update']);
            Route::delete('/delete/{id}', [BugsController::class, 'delete']);
        });
        Route::post('/logout',  [CustomerAuthController::class, 'logout']);
    });
});


Route::post('/login', [UserAuthController::class, 'login']);

Route::group(['middleware' => ['auth.user']], function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/employee', [EmployeeController::class, 'index']);
    Route::post('/employee/create', [EmployeeController::class, 'create']);
    Route::get('/employee/{id}', [EmployeeController::class, 'get_employee']);
    Route::put('/employee/update/{id}', [EmployeeController::class, 'update']);
    Route::delete('/employee/delete/{id}', [EmployeeController::class, 'delete']);

    Route::get('/customer', [CustomerController::class, 'index']);
    Route::post('/customer/create', [CustomerController::class, 'create']);
    Route::get('/customer/{id}', [CustomerController::class, 'get_customer']);
    Route::put('/customer/update/{id}', [CustomerController::class, 'update']);
    Route::delete('/customer/delete/{id}', [CustomerController::class, 'delete']);

    Route::get('/company', [CompanyController::class, 'index']);
    Route::post('/company/create', [CompanyController::class, 'create']);
    Route::get('/company/{id}', [CompanyController::class, 'get_company']);
    Route::post('/company/update/{id}', [CompanyController::class, 'update']);
    Route::delete('/company/delete/{id}', [CompanyController::class, 'delete']);

    Route::get('/project', [ProjectController::class, 'index']);
    Route::post('/project/create', [ProjectController::class, 'create']);
    Route::get('/project/{id}', [ProjectController::class, 'get_project']);
    Route::post('/project/update/{id}', [ProjectController::class, 'update']);
    Route::delete('/project/delete/{id}', [ProjectController::class, 'delete']);

    Route::get('/bug-types', [BugTypeController::class, 'index']);
    Route::post('/bug-types/create', [BugTypeController::class, 'create']);
    Route::get('/bug-types/{id}', [BugTypeController::class, 'get_bug_type']);
    Route::put('/bug-types/update/{id}', [BugTypeController::class, 'update']);
    Route::delete('/bug-types/delete/{id}', [BugTypeController::class, 'delete']);

    Route::get('/bug', [BugController::class, 'index']);
    Route::post('/bug/create', [BugController::class, 'create']);
    Route::get('/bug/{id}', [BugController::class, 'get_bug']);
    Route::post('/bug/update/{id}', [BugController::class, 'update']);
    Route::delete('/bug/delete/{id}', [BugController::class, 'delete']);

    Route::post('/logout', [UserAuthController::class, 'logout']);
});

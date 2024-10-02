<?php

use App\Http\Controllers\API\Auth\CustomerAuthController;
use App\Http\Controllers\API\Auth\UserAuthController;
use App\Http\Controllers\API\Customer\BugsController;
use App\Http\Controllers\API\User\CompanyController;
use App\Http\Controllers\API\User\CustomerController;
use App\Http\Controllers\API\User\EmployeeController;
use App\Http\Controllers\API\User\ProjectController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [UserAuthController::class, 'login']);

Route::group(['middleware' => ['auth.user']], function () {
    // Route::prefix('bug')->group(function () {
    Route::get('/employee', [EmployeeController::class, 'index']);
    Route::post('/employee/create', [EmployeeController::class, 'create']);
    Route::put('/employee/update/{id}', [EmployeeController::class, 'update']);
    Route::delete('/employee/delete/{id}', [EmployeeController::class, 'delete']);

    Route::get('/customer', [CustomerController::class, 'index']);
    Route::post('/customer/create', [CustomerController::class, 'create']);
    Route::put('/customer/update/{id}', [CustomerController::class, 'update']);
    Route::delete('/customer/delete/{id}', [CustomerController::class, 'delete']);

    Route::get('/company', [CompanyController::class, 'index']);
    Route::post('/company/create', [CompanyController::class, 'create']);
    Route::put('/company/update/{id}', [CompanyController::class, 'update']);
    Route::delete('/company/delete/{id}', [CompanyController::class, 'delete']);

    Route::get('/project', [ProjectController::class, 'index']);
    Route::post('/project/create', [ProjectController::class, 'create']);
    Route::put('/project/update/{id}', [ProjectController::class, 'update']);
    Route::delete('/project/delete/{id}', [ProjectController::class, 'delete']);
    // });

    Route::post('/logout', [UserAuthController::class, 'logout']);
});

Route::prefix('customer')->group(function () {
    Route::post('/login', [CustomerAuthController::class, 'login']);

    Route::group(['middleware' => ['auth.customer']], function () {
        Route::prefix('company')->group(function () {
            Route::get('/', [BugsController::class, 'index']);
            Route::post('/create', [CompanyController::class, 'create']);
        });
        Route::post('/logout',  [CustomerAuthController::class, 'logout']);
    });
});

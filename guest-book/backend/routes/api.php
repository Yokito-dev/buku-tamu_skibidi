<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\KepseksController;

Route::post('/register', [authController::class, 'register']);
Route::post('/login', [authController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [authController::class, 'user']);
    Route::post('/logout', [authController::class, 'logout']);

});
Route::get('/staf', [KepseksController::class, 'index']);
Route::post('/kepseks', [KepseksController::class, 'post']);    

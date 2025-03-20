<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\KepseksController;
use App\Http\Controllers\Perf_QMRsController;
use App\Http\Controllers\Keuangan_AdministrasisController;
use App\Http\Controllers\KurikulumsController;

Route::post('/register', [authController::class, 'register']);
Route::post('/login', [authController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [authController::class, 'user']);
    Route::post('/logout', [authController::class, 'logout']);

});
Route::get('/kepseks', [KepseksController::class, 'index']);
Route::post('/kepseks', [KepseksController::class, 'store']);

Route::get('/perf_q_m_rs', [Perf_QMRsController::class, 'index']);
Route::post('/perf_q_m_rs', [Perf_QMRsController::class, 'store']);

Route::get('/keuangan_administrasis', [Keuangan_AdministrasisController::class, 'index']);
Route::post('/keuangan_administrasis', [Keuangan_AdministrasisController::class, 'store']);

Route::get('/kurikulums', [KurikulumsController::class, 'index']);
Route::post('/kurikulums', [KurikulumsController::class, 'store']);

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\KepseksController;
use App\Http\Controllers\Perf_QMRsController;
use App\Http\Controllers\Keuangan_AdministrasisController;
use App\Http\Controllers\KurikulumsController;
use App\Http\Controllers\KesiswaanController;
use App\Http\Controllers\SarpraController;
use App\Http\Controllers\HubinController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\ChartController;

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

Route::get('/kesiswaans', [KesiswaanController::class, 'index']);
Route::post('/kesiswaans', [KesiswaanController::class, 'store']);

Route::get('/sarpras', [SarpraController::class, 'index']);
Route::post('/sarpras', [SarpraController::class, 'store']);

Route::get('/hubins', [HubinController::class, 'index']);
Route::post('/hubins', [HubinController::class, 'store']);

Route::get('/ppdbs', [PpdbController::class, 'index']);
Route::post('/ppdbs', [PpdbController::class, 'store']);

Route::get('/gurus', [GuruController::class, 'index']);
Route::post('/gurus', [GuruController::class, 'store']);
    
Route::get('/chart-data', [ChartController::class, 'getChartData']);
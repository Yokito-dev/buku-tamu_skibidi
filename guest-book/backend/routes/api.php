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
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\StatusController;

Route::post('/register', [authController::class, 'register']);
Route::post('/login', [authController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [authController::class, 'user']);
    Route::post('/logout', [authController::class, 'logout']);

});

// Update Status
Route::put('/data/update-status', [DataController::class, 'updateStatus']);

// Delete Controller
Route::delete('/data/delete-by-phone', [DataController::class, 'destroyByPhone']);

// Route Notifikasi
//Route::get('/notifications/unread/{userId}', [NotificationController::class, 'getUnreadNotifications']);
Route::get('/notifications/type/{userType}', [NotificationController::class, 'getNotificationsByType']);
Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
Route::put('/notifications/read/all', [NotificationController::class, 'markAllAsRead']);
Route::get('/notifications/type/{userType}/unread', [NotificationController::class, 'getUnreadNotificationsByType']);


Route::get('/notifications', [NotificationController::class, 'getNotifications']);

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
    
// Chart Controller 
Route::get('/chart-data', [ChartController::class, 'getChartData']);
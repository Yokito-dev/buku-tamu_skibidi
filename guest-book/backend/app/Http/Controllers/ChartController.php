<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    public function getChartData()
    {
        $labels = [
            'Kepala Sekolah',
            'PPDB (Penerimaan Peserta Didik Baru)',
            'Hubin (Hubungan Industri)',
            'Kesiswaan',
            'Sarpra (Sarana dan Prasarana)',
            'Kurikulum',
            'Keuangan / Administrasi',
            'SDM (Sumber Daya Manusia)'
        ];
    
        $totals = [
            DB::table('kepseks')->count(),
            DB::table('perf_q_m_rs')->count(),
            DB::table('ppdbs')->count(),
            DB::table('hubins')->count(),
            DB::table('kesiswaans')->count(),
            DB::table('sarpras')->count(),
            DB::table('kurikulums')->count(),
            DB::table('keuangan_administrasis')->count(),
            DB::table('gurus')->count() 
        ];
    
        return response()->json([
            'labels' => $labels,
            'totals' => $totals
        ]);
    }  
}

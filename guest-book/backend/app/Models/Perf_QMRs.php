<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perf_QMRs extends Model
{
    use HasFactory;

    protected $table = 'perf_q_m_rs';

    protected $fillable = [
        'nama_tamu',
        'instansi',
        'tujuan',
        'nama_yang_dikunjungi',
        'keperluan',
        'kartu_identitas',
        'nomor_telepon',
    ];
}

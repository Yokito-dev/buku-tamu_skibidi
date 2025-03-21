<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sarpra extends Model
{
    use HasFactory;

    protected $table = 'sarpras';

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

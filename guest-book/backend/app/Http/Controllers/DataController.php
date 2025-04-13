<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataController extends Controller
{

    // Fungsi untuk menghapus data berdasarkan nomor telepon
    public function destroyByPhone(Request $request)
    {
        // Ambil nomor telepon dari request
        $nomor_telepon = $request->input('nomor_telepon');

        // Validasi jika nomor telepon tidak dikirim
        if (!$nomor_telepon) {
            return response()->json(['message' => 'Nomor telepon diperlukan'], 400);
        }

        // Daftar tabel yang akan diperiksa
        $tables = ['gurus','hubins','kepseks','kesiswaans','keuangan_administrasis','kurikulums','perf_q_m_rs','ppdbs','sarpras']; // Sesuaikan nama tabel

        // Looping untuk mencari dan menghapus data dari tabel yang memiliki nomor telepon
        foreach ($tables as $table) {
            $deleted = DB::table($table)->where('nomor_telepon', $nomor_telepon)->delete();

            // Jika data ditemukan dan dihapus, kembalikan response sukses
            if ($deleted) {
                return response()->json([
                    'message' => "Data dengan nomor telepon $nomor_telepon berhasil dihapus dari tabel $table"
                ], 200);
            }
        }

        // Jika tidak ditemukan di tabel mana pun, kembalikan response 404
        return response()->json(['message' => 'Data tidak ditemukan di tabel mana pun'], 404);
    }

    // fungsi untuk mengupdate status
    public function updateStatus(Request $request)
    {
        // Ambil data dari request
        $nomor_telepon = $request->input('nomor_telepon');
        $new_status = $request->input('status');

        // Validasi input
        if (!$nomor_telepon || !$new_status) {
            return response()->json(['message' => 'Nomor telepon dan status diperlukan'], 400);
        }

        // Daftar tabel yang mungkin berisi data
        $tables = ['gurus','hubins','kepseks','kesiswaans','keuangan_administrasis','kurikulums','perf_q_m_rs','ppdbs','sarpras']; // Sesuaikan nama tabel

        // Looping untuk mencari dan mengupdate status
        foreach ($tables as $table) {
            $updated = DB::table($table)
                ->where('nomor_telepon', $nomor_telepon)
                ->update(['status' => $new_status]);

            if ($updated) {
                return response()->json([
                    'message' => "Status berhasil diperbarui di tabel $table"
                ], 200);
            }
        }

        return response()->json(['message' => 'Data tidak ditemukan di tabel mana pun'], 404);
    }
}


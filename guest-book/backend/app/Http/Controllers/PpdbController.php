<?php

namespace App\Http\Controllers;

use App\Models\Ppdb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class PpdbController extends Controller
{
    public function index()
    {
        Log::info('Akses ke endpoint index daftar staf');
        $staf = Ppdb::all();
        return response()->json($staf);
    }

    // GANTI "post" MENJADI "store"
    public function store(Request $request)
    {
         // Tambahkan log untuk melihat data masuk dari front end
         Log::info('Request masuk ke controller', ['data' => $request->all()]);
         //Tambahkan Log Dasar 
         Log::info('Request masuk ke post() controller'); // ← Tambahan log dasar
         //Data REQUEST dari front end
         Log::info('Data request dari frontend', ['data' => $request->all()]);
        try {
            $validatedData = $request->validate([
                'nama_tamu' => 'required|string',
                'instansi' => 'required|string',
                'tujuan' => 'required|in:Kepala Sekolah,Perf. QMR,Keuangan / Administrasi,Kurikulum,Kesiswaan,Sarpra (Sarana dan Prasarana),Hubin (Hubungan Industri),PPDB (Penerimaan Peserta Didik Baru),Guru',
                'nama_yang_dikunjungi' => ['required', 'string'],
                'keperluan' => 'required|string',
                'kartu_identitas' => 'required|in:KTP (Kartu Tanda Penduduk),NPWP (Nomor Pokok Wajib Pajak),ID Pegawai / Karyawan',
                'nomor_telepon' => 'required|string|min:10|max:15',
            ]);

            $staf = Ppdb::create($validatedData);

            // Simpan file JSON di folder `storage/app/daftarstaf/`
            $fileName = '/daftarstaf' . time() . '.json';
            Storage::put('daftarstaf/' . $fileName, json_encode($validatedData, JSON_PRETTY_PRINT));

            Log::info('Data staf berhasil disimpan', ['data' => $validatedData]);
            return response()->json([
                'message' => 'Data berhasil disimpan!',
                'data' => $staf,
                'file' => $fileName,
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan data',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Gagal menyimpan data:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

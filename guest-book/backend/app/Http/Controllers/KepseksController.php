<?php

namespace App\Http\Controllers;

use App\Models\Kepsek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class KepseksController extends Controller
{
    public function index()
    {
        $staf = Kepsek::all();
        return response()->json($staf);
    }

    public function post(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nama_tamu' => 'required|string',
                'instansi' => 'required|string',
                'tujuan' => 'required|in:Kepala Sekolah,SDM (Sumber Daya Alam),Keuangan / Administrasi,Kurikulum,Kesiswaan,Sarpra (Sarana dan Prasarana),Hubin (Hubungan Industri),PPDB (Penerimaan Peserta Didik Baru),Guru',
                'nama_yang_dikunjungi' => ['required', 'string', function ($attribute, $value, $fail) {
                    $validNames = [
                        'Muhammad Saad, S.Pd., M.P.d.',
                        'Muhammad Amsa'
                    ];
                    if (!in_array($value, $validNames, true)) {
                        $fail('Nama yang dikunjungi tidak valid.');
                    }
                }],
                'keperluan' => 'required|string',
                'kartu_identitas' => 'required|in:KTP (Kartu Tanda Penduduk),NPWP (Nomor Pokok Wajib Pajak),ID Pegawai / Karyawan',
                'nomor_telepon' => 'required|string|min:10|max:15',
            ]);

            $staf = Kepsek::create($validatedData);

            // Simpan file JSON di folder `storage/app/daftarstaf/`
            $fileName = '/daftarstaf' . time() . '.json';
            Storage::put('daftarstaf/' . $fileName, json_encode($validatedData, JSON_PRETTY_PRINT));

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

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Stelkers from '../assets/svgs/StelkerAtas.svg';
import BgForm from '../assets/svgs/gepeng.svg';
import Link from 'next/link';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

function Page() {
  // Data guru per unit
  const guruPerUnit = {
    "Kepala Sekolah": ["Muhammad Saad, S.Pd., M.P.d."],
    "SDM (Sumber Daya Manusia)": ["Budi Santoso", "Rina Permata"],
    "Keuangan / Administrasi": ["Siti Aminah", "Fadli Rahman"],
    "Kurikulum": ["Ahmad Fauzi", "Lina Mardiana"],
    "Kesiswaan": ["Dewi Kartika", "Hendra Wijaya"],
    "Sarpra (Sarana dan Prasarana)": ["Andi Pratama", "Rina Dewi"],
    "Hubin (Hubungan Industri)": ["Eko Saputra", "Nina Sari"],
    "PPDB (Penerimaan Peserta Didik Baru)": ["Ratna Sari", "Yusuf Hidayat"],
    "Guru": ["Guru 1", "Guru 2", "Guru 3"],
  };

  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    unit: '',
    guru: '',
    identity: '',
    keterangan: '',
    needs: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      let newState = { ...prevState, [name]: value };

      // Jika unit adalah "Kepala Sekolah", langsung set guru tanpa dropdown
      if (name === "unit") {
        newState.guru = value === "Kepala Sekolah" ? "Muhammad Saad, S.Pd., M.P.d." : "";
      }

      return newState;
    });
  };

  const daftarGuru = formData.unit && formData.unit !== "Kepala Sekolah" ? guruPerUnit[formData.unit] || [] : [];

  const isFormValid = Object.values(formData).every((value) => value !== '');

  return (
    <>
      <main className='bg-[#AF1318]'>
        <Image src={Stelkers} alt="Stelkers" className="ml-[330px]" />
        <div className="absolute -mt-20">
          {/* Header dengan tombol kembali */}
          <div className='flex absolute'>
            <Link href='/'>
              <h1 className='flex font-medium mt-5 pl-[18px] text-[#AF1318]'>
                <MdOutlineKeyboardArrowLeft className='mt-1' /> Kembali
              </h1>
            </Link>
            <p className='text-orange-700 text-xs font-semibold mt-5 ml-[240px]'>
              Note: <span className='text-[#09122C]'>Semua pertanyaan wajib diisi agar dapat dikumpul</span>
            </p>
          </div>

          <Image src={BgForm} alt="Background Form" width={1600} height={800} className="bg-[#E6E6E9]" />

          <div className="flex justify-center items-center mt-[70px]">
            <form className="grid grid-cols-2 gap-x-8 gap-y-4 -mt-[780px] max-w-[1000px] w-full">
              {/* Kolom Kiri */}
              <div className="space-y-4">
                {/* Input Nama */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Nama</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                    placeholder="Nama lengkap (KAPITAL)"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Input Instansi */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Instansi</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                    placeholder="Instansi / Jabatan"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                {/* Pilih Unit */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Tujuan (Unit)</label>
                  <select
                    name="unit"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <option value="">Unit</option>
                    {Object.keys(guruPerUnit).map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                {/* Pilih Guru atau otomatis isi jika Kepala Sekolah */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Nama Yang Dikunjungi</label>
                  {formData.unit === "Kepala Sekolah" ? (
                    <input
                      type="text"
                      name="guru"
                      className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                      value="Muhammad Saad, S.Pd., M.P.d."
                      readOnly
                    />
                  ) : (
                    <select
                      name="guru"
                      className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                      value={formData.guru}
                      onChange={handleChange}
                      disabled={!formData.unit}
                    >
                      <option value="">Memilih Orang</option>
                      {daftarGuru.map((guru, index) => (
                        <option key={index} value={guru}>{guru}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4">
                {/* Textarea Keperluan */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Keperluan</label>
                  <textarea
                    name="keterangan"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2] h-[159px] resize-none"
                    placeholder="Jelaskan keperluan anda..."
                    value={formData.keterangan}
                    onChange={handleChange}
                  />
                </div>

                {/* Pilih Kartu Identitas */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Kartu Identitas</label>
                  <select
                    name="identity"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                    value={formData.identity}
                    onChange={handleChange}
                  >
                    <option value="">Pilih Identitas</option>
                    <option value="KTP">KTP</option>
                    <option value="NPWP">NPWP</option>
                    <option value="ID Pegawai / Karyawan">ID Pegawai / Karyawan</option>
                  </select>
                </div>

                {/* Input Nomor Telepon */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Nomor Telepon</label>
                  <input
                    type="text"
                    name="needs"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                    placeholder="08.."
                    value={formData.needs}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>

            {/* Tombol Submit */}
            <Link href="/closing" className="absolute -mt-[250px]">
              <button className={`text-white font-bold px-10 py-2 rounded-full bg-[#BC2D32] ${!isFormValid && 'opacity-50 cursor-not-allowed'}`} disabled={!isFormValid}>
                Submit
              </button>
            </Link>

          </div>
        </div>
        <Image src={Stelkers} alt="Stelkers" className="ml-[330px]  mt-[410px]" />

        {/* Warna merah di bawah Stelkers */}
        <div className="w-full h-[300px] bg-[#AF1318]"></div>
      </main>
    </>
  );
}

export default Page;
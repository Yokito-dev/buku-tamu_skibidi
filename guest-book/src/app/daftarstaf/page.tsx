'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import Link from 'next/link';
import Navbar from '../assets/svgs/Navbarstaf.svg';
import Notif from '../assets/svgs/Lonceng.svg';
import Profile from '../assets/svgs/Profile.svg';
import LogoDaftarTamu from '../assets/svgs/IconDaftarAktif.svg';

interface Tamu {
  nama_tamu: string;
  instansi: string;
  tujuan: string;
  nama_yang_dikunjungi: string;
  keperluan: string;
  kartu_identitas: string;
  nomor_telepon: string;
}

export default function Page() {
  const [data, setData] = useState<Tamu[]>([]);

  // Fetch Data dari Laravel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/kepseks");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Tanggal Hari Ini
  const [tanggal, setTanggal] = useState({
    dayName: '',
    date: 0,
    monthName: '',
    year: 0
  });

  useEffect(() => {
    const today = new Date();
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus",
      "September", "Oktober", "November", "Desember",
    ];

    const dayName = days[today.getDay()];
    const date = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();

    setTanggal({ dayName, date, monthName, year });
  }, []);

  return (
    <>
      <body className='bg-[#faf3ff]'>
        <div>
          <Image src={Navbar} alt='Navbar' width={1536} />
          <Link href='/lobbystaf'>
            <p className='mt-[-70px] ml-[55px] text-[20px] text-white font-medium flex '>
              <MdKeyboardArrowLeft className='text-[30px] text-white' /> Daftar Tamu
              <Image src={LogoDaftarTamu} alt='DaftarTamu' className='ml-2' />
            </p>
          </Link>
          <div className='flex' style={{ marginTop: "-30px", marginLeft: "1330px" }}>
            <Image src={Notif} alt='Notif' width={30} className='mr-[35px]' />
            <Link href="/profile2">
              <Image src={Profile} alt="Profile" width={35} className="cursor-pointer hover:opacity-80 transition-opacity" />
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: "-34px", marginLeft: "700px" }}>
            <input
              type='text'
              placeholder='Cari'
              style={{
                marginLeft: '-100px',
                padding: '5px 100px',
                borderRadius: '100px',
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '14px',
                textAlign: 'center',
              }}
            />
          </div>
        </div>

        {/* Tanggal */}
        <div className='mt-20'>
          <div className='mb-10 ml-36 flex'>
            <h1 className='font-semibold' style={{ fontSize: "17px" }}>
              {tanggal.dayName}
            </h1>
            <p className='ml-36 font-medium mb-10' style={{ fontSize: "17px" }}>
              {`${tanggal.date} ${tanggal.monthName} ${tanggal.year}`}
            </p>
          </div>

          {/* Tabel */}
          <table className='ml-36' style={{ width: "80%", borderCollapse: "collapse" }}>
            <thead style={{ position: "sticky", bottom: "0", backgroundColor: "#E3E2EC" }}>
              <tr className="border-[#EBEAF2] border-2 rounded-3xl">
                <th style={{ borderRadius: "20px 0px 0px 0px", padding: "15px", textAlign: "left" }}>Nama</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Instansi</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Tujuan</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Nama Yang Dikunjungi</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Keperluan</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Kartu Identitas</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Nomor Telepon</th>
                <th style={{ borderRadius: "0px 20px 0px 0px", padding: "15px", textAlign: "left" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} className="bg-white border-2">
                    <td className='text-sm font-medium' style={{ padding: "15px", textAlign: "left" }}>
                      {item.nama_tamu}<br />
                      <span className='text-gray-400 text-sm'>{item.instansi}</span>
                    </td>
                    <td style={{ padding: "15px", textAlign: "left" }}>{item.instansi}</td>
                    <td style={{ padding: "15px", textAlign: "left" }}>{item.tujuan}</td>
                    <td style={{ padding: "15px", textAlign: "left" }}>{item.nama_yang_dikunjungi}</td>
                    <td style={{ padding: "15px", textAlign: "left" }}>{item.keperluan}</td>
                    <td style={{ padding: "15px", textAlign: "left" }}>{item.kartu_identitas}</td>
                    <td style={{ padding: "15px", textAlign: "left" }}>{item.nomor_telepon}</td>
                    <td style={{ padding: "15px", textAlign: "left" }}>-</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ padding: "15px", textAlign: "center" }}>Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </body>
    </>
  );
}



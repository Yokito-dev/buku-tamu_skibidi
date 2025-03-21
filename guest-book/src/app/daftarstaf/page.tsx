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
  const [kepsekData, setKepsekData] = useState<Tamu[]>([]);
  const [keuanganData, setKeuanganData] = useState<Tamu[]>([]);
  const [perfData, setPerfData] = useState<Tamu[]>([]);
  const [kurikulumData, setKurikulumData] = useState<Tamu[]>([]);
  const [kesiswaanData, setKesiswaanData] = useState<Tamu[]>([]);
  const [sarpraData, setSarpraData] = useState<Tamu[]>([]);
  const [hubinData, setHubinData] = useState<Tamu[]>([]);
  const [ppdbData, setPpdbData] = useState<Tamu[]>([]);
  const [guruData, setGuruData] = useState<Tamu[]>([]);
  const [data, setData] = useState<Tamu[]>([]); // Data gabungan untuk tabel

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kepsekRes, keuanganRes, perfRes, kurikulumRes, kesiswaanRes, sarpraRes, hubinRes, ppdbRes, guruRes,] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/kepseks"),
          axios.get("http://127.0.0.1:8000/api/perf_q_m_rs"),
          axios.get("http://127.0.0.1:8000/api/keuangan_administrasis"),
          axios.get("http://127.0.0.1:8000/api/kurikulums"),
          axios.get("http://127.0.0.1:8000/api/kesiswaans"),
          axios.get("http://127.0.0.1:8000/api/sarpras"),
          axios.get("http://127.0.0.1:8000/api/hubins"),
          axios.get("http://127.0.0.1:8000/api/ppdbs"),
          axios.get("http://127.0.0.1:8000/api/gurus"),
        ]);

        setKepsekData(kepsekRes.data);
        setKeuanganData(keuanganRes.data);
        setPerfData(perfRes.data);
        setKurikulumData(kurikulumRes.data);
        setKesiswaanData(kesiswaanRes.data);
        setSarpraData(sarpraRes.data);
        setHubinData(hubinRes.data);
        setPpdbData(ppdbRes.data);
        setGuruData(guruRes.data);

        // Gabungkan semua data untuk tabel
        setData([...kepsekRes.data, ...keuanganRes.data, ...perfRes.data, ...kurikulumRes.data, ...kesiswaanRes.data, ...sarpraRes.data, ...hubinRes.data, ...ppdbRes.data, ...guruRes.data,]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const today = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  const dayName = days[today.getDay()];
  const date = today.getDate();
  const monthName = months[today.getMonth()];
  const year = today.getFullYear();

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
          <div className='flex absolute top-6 right-2'>
            <Link href="/notifikasi2">
            <Image
              src={Notif}
              alt='Notif'
              width={30}
              className='mr-[35px] cursor-pointer hover:opacity-80 mt-1'
            />
            </Link>
            <Link href="/profile2">
              <Image
                src={Profile}
                alt="Profile"
                width={35}
                className="cursor-pointer hover:opacity-80 transition-opacity mr-[69px]"
              />
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: "-34px", marginLeft: "700px", position: "relative" }}>
          <IoMdSearch
            style={{
              position: "absolute",
              left: "-35px",
              color: "#888",
              fontSize: "18px"
            }}
          />
          <input
            type='text'
            placeholder='Cari'
            style={{
              marginLeft: '-50px',
              padding: '5px 100px',
              borderRadius: '100px',
              border: '1px solid #ccc',
              outline: 'none',
              fontSize: '14px',
              textAlign: 'center', // Sesuaikan text alignment
            }}
          />
        </div>


        {/* Tanggal */}
        <div className='mt-[60px]'>
          <div className='mb-10 ml-20 flex'>
            <h1 className='font-semibold ' style={{ fontSize: "17px" }}>{`${dayName}`}</h1>
            <p className='ml-4 font-medium' style={{ fontSize: "17px" }}>{`${date}, ${monthName}, ${year}`}</p>
          </div>

          {/* Tabel */}
          <table className='ml-20' style={{ width: "92%", borderCollapse: "collapse" }}>
            <thead style={{ position: "sticky", bottom: "0", backgroundColor: "#E3E2EC" }}>
              <tr className="border-[#EBEAF2] border-2 rounded-3xl">
                <th style={{ borderRadius: "20px 0px 0px 0px", padding: "15px", textAlign: "left" }}>Nama</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Hari / Tanggal </th>
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
                    {/* Nama dan Instansi dalam satu sel */}
                    <td className='text-sm font-medium' style={{ padding: "15px 20px", textAlign: "left" }}> {/* Spacing tambahan */}
                      {item.nama_tamu}<br />
                      <span className='text-gray-400 text-sm'>{item.instansi}</span> {/* Instansi di bawah nama */}
                    </td>

                    {/* Tanggal Hari Ini */}
                    <td className='text-sm font-medium' style={{ padding: "15px 20px", textAlign: "left" }}> {/* Spacing tambahan */}
                      {` ${date} ${monthName} ${year}`}<br />  {/* Tanggal hari ini */}
                    </td>

                    {/* Tujuan */}
                    <td style={{ padding: "15px 20px", textAlign: "left" }}> {/* Spacing tambahan */}
                      {item.tujuan}
                    </td>

                    {/* Nama yang Dikunjungi */}
                    <td style={{ padding: "15px 20px", textAlign: "left" }}> {/* Spacing tambahan */}
                      {item.nama_yang_dikunjungi}
                    </td>

                    {/* Keperluan */}
                    <td style={{ padding: "15px 20px", textAlign: "left" }}> {/* Spacing tambahan */}
                      {item.keperluan}
                    </td>

                    {/* Kartu Identitas */}
                    <td style={{ padding: "15px 20px", textAlign: "left" }}> {/* Spacing tambahan */}
                      {item.kartu_identitas}
                    </td>

                    {/* Nomor Telepon */}
                    <td style={{ padding: "15px 20px", textAlign: "left" }}> {/* Spacing tambahan */}
                      {item.nomor_telepon}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "15px 20px", textAlign: "left" }}> {/* Spacing tambahan */}
                      -
                    </td>
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
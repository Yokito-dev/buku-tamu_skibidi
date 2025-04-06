'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Link from 'next/link';
import segitiga from '../assets/svgs/SegitigaSidebarKecil.svg';
import Icon from '../assets/svgs/IconTelkomSchool.svg';
import Daftar from '../assets/svgs/IconDaftarAktif.svg';
import Orang from '../assets/svgs/LogoPengguna.svg';
import statistik from '../assets/svgs/LogoStatistik.svg';
import keluar from '../assets/svgs/LogoKeluar.svg';
import Home from '../assets/svgs/LogoHomeAbu.svg';

interface Tamu {
  nama_tamu: string;
  instansi: string;
  tujuan: string;
  nama_yang_dikunjungi: string;
  keperluan: string;
  kartu_identitas: string;
  nomor_telepon: string;
  created_at: Date;
}

function Page() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [kurikulumData, setKurikulumData] = useState<Tamu[]>([]);
  const [data, setData] = useState<Tamu[]>([]); // Combined data for the table

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kurikulumRes,] = await Promise.all([
            axios.get("http://127.0.0.1:8000/api/kurikulums"),
        ]);

        setKurikulumData(kurikulumRes.data);

        // Combine all data for the table
        setData([
          ...kurikulumRes.data,
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(tamu =>
    tamu.nama_yang_dikunjungi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tamu.tujuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tamu.keperluan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tamu.created_at 
      ? new Date(tamu.created_at).toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).toLowerCase().includes(searchTerm.toLowerCase())
      : false)
  );

  return (
    <>
      <div className='bg-[#EBEAF2]'>
        <div className='flex'>
          <nav className='bg-[#BA272D] px-7 py-[364.9px]' style={{ borderRadius: "0px 20px 20px 0px" }}>
            <Image
              src={Icon}
              alt=''
              width={50}
              className='absolute mt-[-300px] ml-[-27px]'
            />
            <Image
              src={segitiga}
              alt=''
              className='absolute mt-[-300px] ml-[-27px]'
            />
            <div className='absolute'>
              <Link href='/dashboard'>
                <div className='ml-[-22px] rounded-lg mt-[-160px] hover:bg-[#9C0006] p-[7px]'>
                  <Image
                    src={Home}
                    alt='Home'
                    width={30}
                  />
                </div>
              </Link>
              <Link href='daftaradmin'>
                <div className='ml-[-22px] rounded-lg mt-3 bg-[#9C0006] p-[7px]'>
                  <Image
                    src={Daftar}
                    alt='Home'
                    width={30}
                  />
                </div>
              </Link>
              <Link href='/statistik'>
                <div className='ml-[-22px] rounded-lg mt-3 hover:bg-[#9C0006] p-[7px]'>
                  <Image
                    src={statistik}
                    alt='Home'
                    width={30}
                  />
                </div>
              </Link>
              <Link href='/aksespengguna'>
                <div className='ml-[-22px] rounded-lg mt-3 hover:bg-[#9C0006] p-[7px]'>
                  <Image
                    src={Orang}
                    alt='Home'
                    width={30}
                  />
                </div>
              </Link>
              <Link href='/staf'>
                <div className='ml-[-22px] rounded-lg mt-3 hover:bg-[#9C0006] p-[7px]'>
                  <Image
                    src={keluar}
                    alt='keluar'
                    width={30}
                  />
                </div>
              </Link>
            </div>
          </nav>
          <div>
            <div className='flex'>
              <Link href='/dashboard'>
                <p className='flex text-[25px] mt-10 ml-16 '><MdOutlineKeyboardArrowLeft /><span className='text-lg mt-[-2px] font-semibold'>Daftar Tamu</span></p>
              </Link>
              <input
                type='text'
                placeholder=' Cari'
                style={{
                  marginLeft: '800px',
                  padding: '5px 10px',
                  borderRadius: '100px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  fontSize: '14px',
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-8 mb-8 "
              />
              <p className='text-[25px] flex mt-[35px] ml-5 '><span className='text-base ml-2 font-semibold'>admin lobi</span></p>
            </div>
            <div className='mt-3 flex flex-wrap justify-center'>
              <Link href='/daftaradmin'>
                <button className='mx-8 my-7 font-medium hover:text-red-600'>Kepala Sekolah</button>
              </Link>
              <Link href='/Perf'>
                <button className='mx-8 my-7 font-medium hover:text-red-600'>Perf. QMR</button>
              </Link>
              <Link href='/keuangan'>
                <button className='mx-8 my-7 font-medium hover:text-red-600'>Keuangan / Administrasi</button>
              </Link>
              <Link href='/kurikulum'>
                <button className='mx-8 my-7 font-medium hover:text-red-600'>Kurikulum</button>
              </Link>
              <Link href='/kesiswaan' target='_blank'>
                <button className='mx-8 my-7 font-medium hover:text-red-600'>Kesiswaan</button>
              </Link>
              <Link href='/sarpra' target='_blank'>
                <button className='mx-8 my-7 font-medium hover:text-red-600'>Sarpra</button>
              </Link>
              <Link href='/hubin' target='_blank'>
                <button className='mx-8 my-7 font-medium hover:text-red-600'>Hubin</button>
              </Link>
              <Link href='/ppdb' target='_blank'>
                <button className='mx-8 my-7 font-medium hover:text-red-600'>PPDB</button>
              </Link>
              <Link href='/guru' target='_blank'>
                <button className='mx-8 my-7 font-medium hover:text-red-600'>Guru</button>
              </Link>
            </div>
            <div className='mt-10'>
              <table className='ml-20' style={{ width: "95%", borderCollapse: "collapse" }}>
                <thead style={{ position: "sticky", bottom: "0", backgroundColor: "#E3E2EC" }}>
                  <tr className="border-[#EBEAF2] border-2 rounded-3xl">
                    <th style={{ borderRadius: "20px 0px 0px 0px", padding: "25px", textAlign: "left" }}>Nama</th>
                    <th style={{ padding: "15px", textAlign: "center" }}>Hari / Tanggal</th>
                    <th style={{ padding: "15px", textAlign: "center" }}>Tujuan</th>
                    <th style={{ padding: "15px", textAlign: "center" }}>Nama Yang Dikunjungi</th>
                    <th style={{ padding: "15px", textAlign: "center" }}>Keperluan</th>
                    <th style={{ padding: "15px", textAlign: "center" }}>Kartu Identitas</th>
                    <th style={{ padding: "15px", textAlign: "center" }}>Nomor Telepon</th>
                    <th style={{ padding: "15px", textAlign: "center" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index} className="bg-white border-2">
                        <td className='text-sm font-medium' style={{ padding: "15px", textAlign: "left" }}>
                          {item.nama_tamu}<br />
                          <span className='text-gray-400 text-sm'>{item.instansi}</span>
                        </td>
                        <td className="text-sm font-medium" style={{ padding: "15px 20px", textAlign: "left" }}>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        : "Tanggal tidak tersedia"}
                    </td> 
                        <td style={{ padding: "15px", textAlign: "center" }}>{item.tujuan}</td>
                        <td style={{ padding: "15px", textAlign: "center" }}>{item.nama_yang_dikunjungi}</td>
                        <td style={{ padding: "15px", textAlign: "center" }}>{item.keperluan}</td>
                        <td style={{ padding: "15px", textAlign: "center" }}>{item.kartu_identitas}</td>
                        <td style={{ padding: "15px", textAlign: "center" }}>{item.nomor_telepon}</td>
                        <td style={{ padding: "15px", textAlign: "center" }}>-</td>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
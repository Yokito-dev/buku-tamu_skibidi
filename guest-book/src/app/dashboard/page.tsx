'use client'
import { useState, useEffect, useRef } from "react";
import Sidebar from '../assets/svgs/DashboardSideBar.svg'
import TelkomSchool from '../assets/svgs/TelkomSchool.svg'
import EfekSegitiga from '../assets/svgs/SegitigaSidebar.svg'
import Image from 'next/image'
import { IoMdInformationCircleOutline } from "react-icons/io";
import Statistik from '../assets/svgs/LogoStatistik.svg'
import Tamu from '../assets/svgs/logoDaftarTamu.svg'
import Laporan from '../assets/svgs/LogoPengguna.svg'
import Home from '../assets/svgs/HomeDashboard.svg'
import Keluar from '../assets/svgs/LogoKeluar.svg'
import Profile from '../assets/svgs/ProfileHitam.svg'
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import useAuthMiddleware from "../hooks/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";

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

function page() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { user, logout } = useAuth();
    const router = useRouter();
    const [showWarningModal, setShowWarningModal] = useState(false);

    const handleLogoutClick = () => {
        setShowWarningModal(true);
    };

    const handleConfirmLogout = async () => {
        localStorage.removeItem("auth_token");
        await logout();
    };

    const handleCloseModal = () => {
        setShowWarningModal(false);
    };

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
            <div className='bg-[#f0f0f4] '>
                <div>
                    <div className='flex mt-[-91px]'>
                        <div className="bg-[#BA272D] px-36 border" style={{ marginTop: "90px", borderRadius: "0px 30px 30px 0px", borderColor: "#ba272d" }}>
                            <Image
                                src={TelkomSchool}
                                alt=""
                                className="absolute ml-[-150px] mt-[50px]"
                            />
                            <Image
                                src={EfekSegitiga}
                                alt=""
                                className="absolute ml-[-200px] mt-[-1vh]"
                            />
                        </div>
                        <div>
                            <div className='flex mr-32'>
                                <p className='text-xl font-semibold ml-14 mr-[560px]'></p>
                                <input
                                    type='text'
                                    placeholder=' Cari'
                                    style={{
                                        marginLeft: '20px',
                                        padding: '5px 20px',
                                        borderRadius: '100px',
                                        border: '1px solid #ccc',
                                        outline: 'none',
                                        fontSize: '14px',
                                    }}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="mt-28"
                                />
                                <Link href="/profile3">
                                    <Image
                                        src={Profile}
                                        alt="Profile"
                                        width={30}
                                        className="mt-[113px] ml-36 cursor-pointer transition-transform duration-300 hover:scale-110"
                                    />
                                </Link>

                            </div>
                            <div className='p-8 ml-14 mt-5 mr-[-55px] bg-[#E4262C] rounded-lg'>
                                <p className='text-2xl ml-7 text-white font-semibold'>
                                    Selamat datang di sistem manajemen buku tamu
                                </p>
                                <p className='ml-7 mt-3 font-semibold tracking-wide text-[#f7bbbd]'>
                                    Kelola dan Monitor tamu dengan mudah dan efisien
                                </p>
                            </div>
                            <div>
                                <p className='ml-14 mt-4 font-semibold'>Daftar Tamu</p>
                                <p className='mt-2 text-[#9c9c9e] text-sm ml-14'>Terbaru</p>
                            </div>
                            <div className='ml-14 mt-2' style={{ maxHeight: "400px", overflowY: "auto" }}>
                                <table style={{ width: "100%" }}>
                                    <thead style={{ backgroundColor: "#E3E2EC" }}>
                                        <tr className="border-2 rounded-3xl" style={{ borderColor: "#f0f0f4 #f0f0f4 #EBEAF2 #f0f0f4" }}>
                                            <th className="p-3" style={{ borderRadius: "20px 0px 0px 0px" }}></th>
                                            <th></th>
                                            <th className="text-[14px]" style={{ padding: "20px", textAlign: "left" }}>Nama</th>
                                            <th className="text-[14px]" style={{ padding: "15px", textAlign: "left" }}>Hari / Tanggal</th>
                                            <th className="text-[14px]" style={{ padding: "15px", textAlign: "left" }}>Tujuan</th>
                                            <th className="text-[14px]" style={{ padding: "15px", textAlign: "left" }}>Nama Yang Dikunjungi</th>
                                            <th className="text-[14px]" style={{ padding: "15px", textAlign: "left" }}>Keperluan</th>
                                            <th className="text-[14px]" style={{ padding: "15px", textAlign: "left" }}>Kartu Identitas</th>
                                            <th className="text-[14px]" style={{ padding: "15px", textAlign: "left" }}>Nomor Telepon</th>
                                            <th className="text-[14px]" style={{ borderRadius: "0px 20px 0px 0px", padding: "15px", textAlign: "left" }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length > 0 ? (
                                            filteredData.map((item, index) => (
                                                <tr key={index} className="bg-white border-2">
                                                    <td></td>
                                                    <td className="text-[20px] font-medium" style={{ padding: "0px", textAlign: "right" }}>
                                                        <IoMdInformationCircleOutline />
                                                    </td>
                                                    <td className="text-[13px] font-medium" style={{ padding: "15px", textAlign: "left" }}>
                                                        {item.nama_tamu}<br />
                                                        <span className="text-gray-400" style={{ fontSize: "11px" }}>{item.instansi}</span>
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
                                                    <td className="text-[13px]" style={{ padding: "15px", textAlign: "left" }}>
                                                        {item.tujuan}
                                                    </td>
                                                    <td className="text-[13px]" style={{ padding: "15px", textAlign: "left" }}>
                                                        {item.nama_yang_dikunjungi}
                                                    </td>
                                                    <td className="text-[13px]" style={{ padding: "15px", textAlign: "left" }}>
                                                        {item.keperluan}
                                                    </td>
                                                    <td className="text-[13px]" style={{ padding: "15px", textAlign: "left" }}>
                                                        {item.kartu_identitas}
                                                    </td>
                                                    <td className="text-[13px]" style={{ padding: "15px", textAlign: "left" }}>
                                                        {item.nomor_telepon}
                                                    </td>
                                                    <td style={{ padding: "15px 20px", textAlign: "left" }}>
                                                        -
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} style={{ padding: "15px", textAlign: "center" }}>Tidak ada data</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-[-538px] absolute ml-9 flex bg-[#9C0006] p-4 rounded-lg'>
                    <Image
                        alt=''
                        width={23}
                        src={Home}
                    />
                    <p className='text-white mt-1 ml-5 mr-16 text-sm'>Beranda</p>
                </div>

                <Link href='/daftaradmin' target="_blank">
                    <div className='mt-[-490px] absolute ml-9 flex p-4 hover:bg-[#9C0006] rounded-lg'>
                        <Image
                            alt=''
                            width={30}
                            src={Tamu}
                        />
                        <p className='text-[#e09ea0] mt-1 ml-4 mr-8 text-sm'>Daftar Tamu</p>
                    </div>
                </Link>

                <Link href='/statistik' target="_blank">
                    <div className='mt-[-440px] absolute ml-9 hover:bg-[#9C0006] flex p-4 rounded-lg'>
                        <Image
                            alt=''
                            width={25}
                            src={Statistik}
                        />
                        <p className='text-[#e09ea0] mt-1 ml-4 mr-1 text-sm'>Laporan Statistik</p>
                    </div>
                </Link>

                <Link href='/aksespengguna' target="_blank">
                    <div className='mt-[-390px] absolute ml-9 flex p-4 hover:bg-[#9C0006] rounded-lg'>
                        <Image
                            alt=''
                            width={25}
                            src={Laporan}
                        />
                        <p className='text-[#e09ea0] mt-1 ml-4 mr-1 text-sm'>Akses Pengguna</p>
                    </div>
                </Link>

                <div
                    className='mt-[-340px] absolute ml-9 flex p-4 rounded-lg hover:bg-[#9C0006] cursor-pointer'
                    onClick={handleLogoutClick}
                >
                    <Image
                        alt=''
                        width={25}
                        src={Keluar}
                    />
                    <p className='text-[#e09ea0] mt-1 ml-4 mr-20 text-sm'>Keluar</p>
                </div>
            </div>
            {/* Modal Konfirmasi Logout */}
            {showWarningModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-12 rounded-lg">
                        {/* Tombol Logout Design */}
                        <p className="mb-4">Apakah Anda yakin ingin keluar?</p>

                        {/* Tombol Logout  */}
                        <div className="flex space-x-4">
                            <button
                                onClick={handleConfirmLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded mr-24"
                            >
                                Keluar
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default page;
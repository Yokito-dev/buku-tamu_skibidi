"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import Link from "next/link";

import Navbar from "../assets/svgs/Navbarstaf.svg";
import Notif from "../assets/svgs/Lonceng.svg";
import Profile from "../assets/svgs/Profile.svg";
import LogoDaftarTamu from "../assets/svgs/IconDaftarAktif.svg";
import Swal from "sweetalert2";

interface Tamu {
  nama_tamu: string;
  instansi: string;
  tujuan: string;
  nama_yang_dikunjungi: string;
  keperluan: string;
  kartu_identitas: string;
  nomor_telepon: string;
  status: string;
  created_at: Date;
}

export default function Page() {
     const [searchTerm, setSearchTerm] = useState<string>('');
    const [ppdbData, setPpdbData] = useState<Tamu[]>([]);
  const [data, setData] = useState<Tamu[]>([]); // Data gabungan untuk tabel

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
            axios.get("http://127.0.0.1:8000/api/ppdbs"),
        ]);

        // Nama tabel sesuai urutan API
        const tableNames = [
          "ppdbs",
        ];

        // Menambahkan properti "table" ke dalam data
        const combinedData = responses.flatMap((response, index) =>
          response.data.map((item: any) => ({
            ...item,
            table: tableNames[index], // Menandai asal tabel untuk update
          }))
        );

        // Menyimpan data ke state individu (jika masih diperlukan)
        setPpdbData(responses[0].data);

        // Menyimpan data gabungan untuk tabel
        setData(combinedData);
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
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[today.getDay()];
  const date = today.getDate();
  const monthName = months[today.getMonth()];
  const year = today.getFullYear();

  // Fungsi untuk konfirmasi hapus
  const handleDelete = async (nomor_telepon: string) => {
    Swal.fire({
      title: "Konfirmasi Hapus",
      text: `Apakah Anda yakin ingin menghapus data dengan nomor ${nomor_telepon}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            "http://localhost:8000/api/data/delete-by-phone",
            {
              data: { nomor_telepon }, // Kirim nomor telepon
            }
          );

          Swal.fire({
            title: "Terhapus!",
            text: response.data.message,
            icon: "success",
            timer: 2000,
          });

          // Perbarui tampilan dengan menghapus data dari state
          setData((prevData) =>
            prevData.filter((item) => item.nomor_telepon !== nomor_telepon)
          );
        } catch (error) {
          let errorMessage = "Terjadi kesalahan saat menghapus data.";

          if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data?.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          Swal.fire({
            title: "Gagal",
            text: errorMessage,
            icon: "error",
          });
        }
      }
    });
  };

  // fungsi untuk dropdown status

  // Fetch data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Fungsi untuk mengupdate status
  const handleStatusChange = async (
    nomor_telepon: string,
    newStatus: string
  ) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/data/update-status",
        {
          nomor_telepon,
          status: newStatus,
        }
      );

      Swal.fire({
        title: "Berhasil!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });

      // Perbarui status di tampilan frontend
      setData((prevData) =>
        prevData.map((item) =>
          item.nomor_telepon === nomor_telepon
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (error) {
      let errorMessage = "Terjadi kesalahan saat mengupdate status.";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Gagal",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  return (
    <>
      <body className="bg-[#faf3ff]">
        <div>
          <Image src={Navbar} alt="Navbar" width={1536} />
          <Link href="/lobbystaf">
            <p className="mt-[-70px] ml-[55px] text-[20px] text-white font-medium flex ">
              <MdKeyboardArrowLeft className="text-[30px] text-white" /> Daftar
              Tamu
              <Image src={LogoDaftarTamu} alt="DaftarTamu" className="ml-2" />
            </p>
          </Link>
          <div className="flex absolute top-6 right-2">
            <Link href="/Notif_PPDB">
              <Image
                src={Notif}
                alt="Notif"
                width={30}
                className="mr-[35px] cursor-pointer hover:opacity-80 mt-1"
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "-34px",
            marginLeft: "700px",
            position: "relative",
          }}
        >
          <IoMdSearch
            style={{
              position: "absolute",
              left: "-35px",
              color: "#888",
              fontSize: "18px",
            }}
          />
          <input
            type="text"
            placeholder="Cari"
            style={{
              marginLeft: "-50px",
              padding: "5px 100px",
              borderRadius: "100px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
              textAlign: "center", // Sesuaikan text alignment
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tanggal */}
        <div className="mt-[60px]">
          <div className="mb-10 ml-20 flex">
            <h1
              className="font-semibold "
              style={{ fontSize: "17px" }}
            >{`${dayName}`}</h1>
            <p
              className="ml-4 font-medium"
              style={{ fontSize: "17px" }}
            >{`${date}, ${monthName}, ${year}`}</p>
          </div>

          {/* Tabel */}
          <table
            className="ml-20"
            style={{ width: "92%", borderCollapse: "collapse" }}
          >
            <thead
              style={{
                position: "sticky",
                bottom: "0",
                backgroundColor: "#E3E2EC",
              }}
            >
              <tr className="border-[#EBEAF2] border-2 rounded-3xl">
                <th
                  style={{
                    borderRadius: "20px 0px 0px 0px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  Nama
                </th>
                <th style={{ padding: "15px", textAlign: "left" }}>
                  Hari / Tanggal{" "}
                </th>
                <th style={{ padding: "15px", textAlign: "left" }}>Tujuan</th>
                <th style={{ padding: "15px", textAlign: "left" }}>
                  Nama Yang Dikunjungi
                </th>
                <th style={{ padding: "15px", textAlign: "left" }}>
                  Keperluan
                </th>
                <th style={{ padding: "15px", textAlign: "left" }}>
                  Kartu Identitas
                </th>
                <th style={{ padding: "15px", textAlign: "left" }}>
                  Nomor Telepon
                </th>
                <th style={{ padding: "15px", textAlign: "left" }}>Status</th>
                <th
                  style={{
                    borderRadius: "0px 20px 0px 0px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
            {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index} className="bg-white border-2">
                        <td className='text-sm font-medium' style={{ padding: "15px 20px", textAlign: "left" }}>
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
                    <td
                      className="text-sm font-medium"
                      style={{ padding: "15px 20px", textAlign: "left" }}
                    >
                      {`${date} ${monthName} ${year}`}
                      <br />
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "left" }}>
                      {item.tujuan}
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "left" }}>
                      {item.nama_yang_dikunjungi}
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "left" }}>
                      {item.keperluan}
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "left" }}>
                      {item.kartu_identitas}
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "left" }}>
                      {item.nomor_telepon}
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "left" }}>
                      <select
                        value={item.status || ""} // Jika status kosong, dropdown akan default ke ""
                        onChange={(e) =>
                          handleStatusChange(item.nomor_telepon, e.target.value)
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="" disabled>
                          Pilih Status
                        </option>
                        <option value="Pending">Pending</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Batal">Batal</option>
                      </select>
                    </td>
                    <td style={{ padding: "15px 20px", textAlign: "left" }}>
                      <button
                        onClick={() => handleDelete(item.nomor_telepon)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 transition duration-200"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    style={{ padding: "15px", textAlign: "center" }}
                  >
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </body>
    </>
  );
}

'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BgBlur2 from "../assets/svgs/BgBlur2.svg";  

function Page() {
  const router = useRouter();

  // Data awal notifikasi
  const [notifications, setNotifications] = useState([
    'Pesan baru dari Admin',
    'Pembayaran telah dikonfirmasi',
    'Update sistem terbaru tersedia'
  ]);

  // Fungsi untuk menghapus notifikasi tertentu
  const removeNotification = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="relative min-h-screen p-8 flex items-center justify-center">
      
      {/* Background Blur */}
      <div className="absolute inset-0 z-[-1]">
        <Image 
          src={BgBlur2} 
          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-70 blur-md"
        />
      </div>

      {/* Card Notifikasi */}
      <div className="relative bg-white border border-gray-300 rounded-lg p-6 shadow-lg w-full max-w-3xl backdrop-blur-md">
        
        {/* Tombol Kembali */}
        <button
          onClick={() => router.back()}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
        >
          ❌
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Notifikasi</h2>

        {/* List Notifikasi */}
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                <span className="text-gray-700 text-sm">{notif}</span>
                <button 
                  onClick={() => removeNotification(index)} 
                  className="text-red-500 hover:text-red-700 text-xs font-bold"
                >
                  Hapus
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Tidak ada notifikasi</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;

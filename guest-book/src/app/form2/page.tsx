  'use client';

  import api from "../utils/axios"
  import React, { useState } from 'react';
  import Image from 'next/image';
  import Stelkers from '../assets/svgs/StelkerAtas.svg';
  import BgForm from '../assets/svgs/gepeng.svg';
  import Link from 'next/link';
  import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
  
  function Page() {
  
    const guruPerUnit = {
      "Kepala Sekolah": ["MUHAMMAD SAAD, S.Pd., M.P.d."],
      "Perf. QMR": ["ASMAWATI, S.Sos","ERWINDA DWI PRATIWI, S.Pd., M.S.Ed"],
      "Keuangan / Administrasi": ["RUMAISHA IKHWANA, SE","ADHYTIA ADHYAKSA, S.E.","ADLI DZIL IKRAM, S.Ak","ANDI MUHAMMAD MAULANA SIDENG, Amd","SJAMSIAH, S.S."],
      "Kurikulum": ["DR. RAHMAT MAHMUD, S.Pd, M.Pd","SRI HASTUTI, S.S.","Drs. SATTUBANG, S.ST, M.Pd","RATU ELIA YUANITA, S.Si","RAODATUL JANNAH, S.T, S.Pd, M.Pd","ALI AKBAR, S. Kom., M.Pd","KHAERUL ISHAK, S.Pd, M.Pd","NURFAIDAH JABBAR, S.IP","YAYU APRILIKA YUNUS, S.Si"],
      "Kesiswaan": ["ERLINDAH ZULHAIDAH SIDNIWATI SUYUTHI, ST., M.Pd","WIDIANI, S.Pd","ROSMAWATI, S.Pd","ABU ALI, S.Pd, Gr","MUHAMMAD IKMAL AKBAR, S.Pd","A. NOORIAH MUJAHIDAH, S.Pd","FARID MAWARDI, S.Pd, Gr., M.Pd","NURDIANAH, S.Pd., M.Pd","HARYADI INDRAWIJAYA, S.Pd"],
      "Sarpra (Sarana dan Prasarana)": ["ALI AKBAR, S. Kom., M.Pd","SUKIRMAN","ASRUL, S.Pd, M.Pd","MATIUS RAWA, S.H.","MANSYUR MUIS, S.M.","EKA MERDEKAWATI, ST, M.Pd","AHWAN AZHARI TAHIR, S.T., Gr"],
      "Hubin (Hubungan Industri)": ["MUSLIADI, S.ST","FIRMAN SYAHIR, S.Pd., M.Pd","DANIEL D. TANAN, SH. M.Pd","SANDY ARDIANSYAH","AYU RISMAYANTI, S.Pd., M.Pd","HASLINA, S.Pd","NURWAHYUNI"],
      "PPDB (Penerimaan Peserta Didik Baru)": ["YAYU APRILIKA YUNUS, S.Si","DANIEL D. TANAN, SH. M.Pd","FIRMAN SYAHIR, S.Pd., M.Pd"],
      "Guru": ["ABDUL MALIK, S.Pd","ADI MANGGALIA AMAHORU, S.Pd","ANANDA DZIKMAH AMALIA AZ, S.Tr.Par","ANDI HANIFAH PUTRI RANI, S.Kom","ARMAN, S.Pd., M.Hum.","ASKAR ASWIN AHMAD, S.Pd","ASNAWI, S.HI., Gr","BAKRI CACO, S.Ag, M.Si","DEMETER JANNIAH SABATINI, S.Pd., M.Pd","DEWI, S.Pd","DINDA PUTRU OETAMI, S.Pd., M.Pd","HARI SUSANTO, S.Pd","HILMAWATI, S.Ag., Gr","KARMILA INDAH HASIN, S.Pd., M.Pd","MESY ANDI IDHAM, S.T"," MOSES SALEMBAN, S.Pd","MUH. ADE SYAM AGUNG, S.Pd","MUHAMMAD FADHLAN SUPRIADI, S.Kom","MUHAMMAD NUR ARBI, S.Pd., M.Pd","NADYAH NURHIDAYAH N, S.Pd., M.Pd","NURHIKMAH UTAMI, S.Pd","OKTAVIANTO, S.Kom","PADLI SEPTIAN, S.Pd","RAHMAT DANI S., S.Kom","RISDAYANTI, S.Pd","ROSALINA, S.Ag, M.Si","SAMRIANI, S.Pd., M.Pd"," SITTI DARMAWATI, S.Pd., M.Pd","SUKMAWATI, S.Pd., M.Pd","TIRSA WULANDARI, S.Pd","TRY SUHARTO, S.Pd","UMMI SUNAIR, S.Pd., M.Pd","WAHYU ILAHI SYAM, S.Pd","YHUGI PRATAMA SAPUTRA A., S.Pd"],
    };

    const [formData, setFormData] = useState({
      nama_tamu: "",
      instansi: "",
      tujuan: "",
      nama_yang_dikunjungi: "",
      keperluan: "",
      kartu_identitas: "",
      nomor_telepon: "",
    });

    const [errorMsg, setErrorMsg] = useState<string | null>(null); // Fungsi Untuk Kirim Error message

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg(null);
    
      let endpoint = "";
    
      if (formData.tujuan === "Kepala Sekolah") {
        endpoint = "/kepseks";
      } else if (formData.tujuan === "Perf. QMR") {
        endpoint = "/perf_q_m_rs";
      } else if (formData.tujuan === "Keuangan / Administrasi") {
        endpoint = "/keuangan_administrasis";
      } else if (formData.tujuan === "Kurikulum"){
        endpoint = "/kurikulums";
      } else if (formData.tujuan === "Kesiswaan"){
        endpoint = "/kesiswaans"
      } else if (formData.tujuan === "Sarpra (Sarana dan Prasarana)"){
        endpoint = "/sarpras"
      } else if (formData.tujuan === "Hubin (Hubungan Industri)"){
        endpoint = "/hubins"
      }else if (formData.tujuan === "PPDB (Penerimaan Peserta Didik Baru)"){
        endpoint = "/ppdbs"
      }else{
        endpoint = "/gurus"
      }
    
      console.log("Endpoint yang digunakan:", endpoint);
      console.log("Data yang dikirim:", formData);
    
      try {
        const response = await api.post(endpoint, formData, {
          headers: { "Content-Type": "application/json" },
        });
    
        console.log("Response dari API:", response.data);
    
        if (response.status === 201) {
          window.location.href = "/closing"; // Navigasi tanpa useRouter
        } else {
          setErrorMsg("Gagal mengirim data, coba lagi.");
        }
      } catch (error: any) {
        console.error("Error response:", error.response?.data);
        setErrorMsg(error.response?.data?.message || "Terjadi kesalahan saat mengirim data.");
      }
    };
    
  
    
    
    
    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;

      setFormData((prevState) => {
        let newState = { ...prevState, [name]: value };

        if (name === "tujuan" && value === "Kepala Sekolah") {
          newState.nama_yang_dikunjungi = "MUHAMMAD SAAD, S.Pd., M.P.d.";
        } else if (name === "tujuan" ) {
          newState.nama_yang_dikunjungi = "";
        }

        return newState;
      });
    };

    const daftarGuru =
      formData.tujuan && formData.tujuan !== "Kepala Sekolah"
        ? guruPerUnit[formData.tujuan as keyof typeof guruPerUnit] || []
        : [];

    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    return (
      <main className="bg-[#AF1318] min-h-screen">
        <Image src={Stelkers} alt="Stelkers" className="ml-[330px] mb-10" />
        <div className="absolute -mt-20 w-full">
          {/* Header */}
          <div className="flex absolute w-full">
            <Link href="/">
              <h1 className="flex font-medium mt-5 pl-[18px] text-[#AF1318]">
                <MdOutlineKeyboardArrowLeft className="mt-1" /> Kembali
              </h1> 
            </Link>
            <p className="text-orange-700 text-xs font-semibold mt-4 ml-[240px]">
              Note:{" "}
              <span className="text-[#09122C]">
                Semua pertanyaan wajib diisi agar dapat dikumpul
              </span>
            </p>
          </div>

          <Image
            src={BgForm}
            alt="Background Form"
            width={1600}
            height={800}
            className="bg-[#E6E6E9] "
          />

          <div className="flex justify-center items-center mt-[130px]">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-x-8 gap-y-4 -mt-[790px] max-w-[1000px] w-full px-4"
            >
              <div className="space-y-[18px]">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama_tamu"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                    placeholder="Nama lengkap (KAPITAL)"
                    value={formData.nama_tamu}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Instansi
                  </label>
                  <input
                    type="text"
                    name="instansi"
                    className="w-full p-[16px] border border-black rounded-[17px] bg-[#ECECF2]"
                    placeholder="Instansi / Jabatan"
                    value={formData.instansi}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Tujuan (Unit)
                  </label>
                  <select
                    name="tujuan"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                    value={formData.tujuan}
                    onChange={handleChange}
                  >
                    <option value="">Unit</option>
                    {Object.keys(guruPerUnit).map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Nama Yang Dikunjungi
                  </label>
                  {formData.tujuan === "Kepala Sekolah" ? (
                    <input
                      type="text"
                      name="nama_yang_dikunjungi"
                      className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                      value="MUHAMMAD SAAD, S.Pd., M.P.d."
                      readOnly
                    />
                  ) : (
                    <select
                      name="nama_yang_dikunjungi"
                      className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                      value={formData.nama_yang_dikunjungi}
                      onChange={handleChange}
                      disabled={!formData.tujuan}
                    >
                      <option value="">Memilih Orang</option>
                      {daftarGuru.map((guru, index) => (
                        <option key={index} value={guru}>
                          {guru}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Keperluan
                  </label>
                  <textarea
                    name="keperluan"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2] h-[159px] resize-none"
                    placeholder="Jelaskan keperluan anda..."
                    value={formData.keperluan}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Kartu Identitas
                  </label>
                  <select
                    name="kartu_identitas"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                    value={formData.kartu_identitas}
                    onChange={handleChange}
                  >
                    <option value="">Pilih</option>
                    <option value="KTP (Kartu Tanda Penduduk)">
                      KTP (Kartu Tanda Penduduk)
                    </option>
                    <option value="NPWP (Nomor Pokok Wajib Pajak)">
                      NPWP (Nomor Pokok Wajib Pajak)
                    </option>
                    <option value="ID Pegawai / Karyawan">
                      ID Pegawai / Karyawan
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    name="nomor_telepon"
                    className="w-full p-4 border border-black rounded-[17px] bg-[#ECECF2]"
                    placeholder="08.."
                    value={formData.nomor_telepon}
                    minLength={10}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  className={`px-6 py-4 rounded-[17px] text-white font-medium ${
                    isFormValid
                      ? "bg-[#db3c3c] hover:bg-[#ff3131]"
                      : "bg-red-400 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                >
                  Submit
                </button>
              </div>
              
              {errorMsg && (
                <div className="col-span-2 text-red-500 text-center mt-2">
                  {errorMsg}  
                </div>
              )}
            </form>
          </div>
        </div>
        <Image src={Stelkers} alt="Stelkers" className="ml-[330px] mt-[550px]" />
      </main>
    );
  }


  export default Page;

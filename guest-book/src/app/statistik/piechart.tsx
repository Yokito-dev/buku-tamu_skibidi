"use client";
import { useEffect, useState, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";

type ChartDataType = {
  name: string;
  value: number;
};

const COLORS = [
  "#0B4F9E",
  "#7857B8",
  "#52B3E6",
  "#FF726E",
  "#FFD24C",
  "#820000",
  "#526983",
  "#4BB543",
];

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const years = ["2022", "2023", "2024", "2025", "2026"];

export default function PieChartComponent() {
  const [chartData, setChartData] = useState<ChartDataType[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialRender = useRef(true);
  const chartRef = useRef<HTMLDivElement>(null); // Tambahkan ref

  const sendLog = async (description: string) => {
    try {
      await fetch("http://localhost:8000/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Gagal mengirim log:", error);
    }
  };

  const fetchChartData = (isAllData = false) => {
    setIsLoading(true);
    const params = new URLSearchParams();

    if (isAllData) {
      params.append("semua", "true");
    } else {
      if (selectedWeek) params.append("minggu", selectedWeek);
      if (selectedMonth) params.append("bulan", selectedMonth);
      if (selectedYear) params.append("tahun", selectedYear);
    }

    fetch(`http://localhost:8000/api/chart-data?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.labels && data.labels.length > 0) {
          const combinedData: ChartDataType[] = data.labels.map(
            (label: string, index: number) => ({
              name: label,
              value: data.totals[index],
            })
          );
          setChartData(combinedData);
        } else {
          setChartData([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching chart data:", err);
        setChartData([]);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      fetchChartData(true);
    } else {
      fetchChartData();
    }
  }, [selectedWeek, selectedMonth, selectedYear]);

  const handleAllDataClick = () => {
    setSelectedWeek("");
    setSelectedMonth("");
    setSelectedYear("");
    fetchChartData(true);
    sendLog("Pengguna menekan tombol 'Semua Data' untuk memuat semua pie chart.");
  };

  // Fungsi untuk unduh chart sebagai gambar
  const handleDownloadImage = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = `piechart_${Date.now()}.png`;
    link.click();

    sendLog("Pengguna mengunduh Pie Chart sebagai gambar.");
  };

  return (
    <div className="mt-[50px] ml-[320px]">
      {/* Filter Options */}
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        <select
          className="bg-[#E4262C] text-white px-6 py-2 border-4 border-red-700 rounded-full font-medium text-[15px] hover:bg-red-800 cursor-pointer"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          <option value="">Semua Minggu</option>
          <option>Minggu 1</option>
          <option>Minggu 2</option>
          <option>Minggu 3</option>
          <option>Minggu 4</option>
        </select>

        <select
          className="bg-[#E4262C] text-white px-6 py-2 border-4 border-red-700 rounded-full font-medium text-[15px] hover:bg-red-800 cursor-pointer"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Semua Bulan</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          className="bg-[#E4262C] text-white px-6 py-2 border-4 border-red-700 rounded-full font-medium text-[15px] hover:bg-red-800 cursor-pointer"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Semua Tahun</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button
          className="bg-[#E4262C] text-white px-6 py-2 border-4 border-red-700 rounded-full font-medium text-[15px] hover:bg-red-800 cursor-pointer"
          onClick={handleAllDataClick}
        >
          Semua Data
        </button>
      </div>

      {/* Chart Section */}
      <div className="flex mt-12 justify-center items-center min-h-[400px]">
        {isLoading ? (
          <p className="text-xl font-semibold">Memuat data...</p>
        ) : chartData.length === 0 ? (
          <p className="text-xl font-semibold">
            Tidak ada data pada rentang ini.
          </p>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {/* Wrapper untuk ditangkap sebagai gambar */}
            <div
              className="flex flex-col lg:flex-row items-center justify-center gap-10"
              ref={chartRef}
            >
              <ResponsiveContainer width={400} height={400}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ value }) => `${value}`}
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="bg-[#dcdce1] border rounded-xl py-8 px-10 shadow-xl">
                {chartData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4">
                    <div
                      className="w-5 h-5 rounded-sm"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <p className="font-medium">{entry.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Unduh */}
            <button
              onClick={handleDownloadImage}
              className="bg-[#E4262C] text-white px-10 py-2 rounded-full  font-medium text-[13px] mt-7  hover:bg-red-800 ml-[435px]"
            >
              Unduh Chart sebagai Gambar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

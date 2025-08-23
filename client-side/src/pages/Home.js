import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // kalau pakai shadcn
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  // Data dummy transaksi per hari
  const salesData = [
    { day: "Sen", sales: 120000 },
    { day: "Sel", sales: 95000 },
    { day: "Rab", sales: 150000 },
    { day: "Kam", sales: 80000 },
    { day: "Jum", sales: 200000 },
    { day: "Sab", sales: 175000 },
    { day: "Min", sales: 100000 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600">Selamat datang di Becer Mart POS 👋</p>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-md bg-[#f5ebe0] border-none">
          <CardContent className="p-4">
            <h2 className="text-sm text-gray-600">Produk</h2>
            <p className="text-xl font-bold">120</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md bg-[#f5ebe0] border-none">
          <CardContent className="p-4">
            <h2 className="text-sm text-gray-600">Transaksi Hari Ini</h2>
            <p className="text-xl font-bold">35</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md bg-[#f5ebe0] border-none">
          <CardContent className="p-4">
            <h2 className="text-sm text-gray-600">Pendapatan Hari Ini</h2>
            <p className="text-xl font-bold">Rp 3.250.000</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md bg-[#f5ebe0] border-none">
          <CardContent className="p-4">
            <h2 className="text-sm text-gray-600">Pengguna Aktif</h2>
            <p className="text-xl font-bold">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Grafik Penjualan */}
      <Card className="rounded-2xl shadow-md bg-white border">
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-4">Penjualan Mingguan</h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={salesData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#d4a373" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

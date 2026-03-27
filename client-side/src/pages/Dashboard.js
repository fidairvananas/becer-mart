import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../css/Dashboard.css";

export default function Dashboard() {
  const [dateTime, setDateTime] = useState(new Date());
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

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // update tiap detik
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="dashboard-header">
        {/* Welcome Section */}
        <div className="welcome-text">
          <h1>
            Dashboard <span className="header-icon">🛒</span>
          </h1>
          <p>
            Selamat datang di <span className="brand">Becer Mart POS</span> 👋
          </p>
        </div>

        {/* Date & Time */}
        <div className="datetime">
          <span className="date">
            {dateTime.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="time">
            {dateTime.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Ringkasan Stat */}
      <div className="stats-container">
        <div className="stat-card produk">
          <div className="stat-info">
            <h2>Jumlah Produk</h2>
            <p>120</p>
          </div>
          <i className="fas fa-box-open"></i>
        </div>

        <div className="stat-card transaksi">
          <div className="stat-info">
            <h2>Transaksi Hari Ini</h2>
            <p>35</p>
          </div>
          <i className="fas fa-receipt"></i>
        </div>

        <div className="stat-card pendapatan">
          <div className="stat-info">
            <h2>Pendapatan Hari Ini</h2>
            <p>Rp 3.250.000</p>
          </div>
          <i className="fas fa-coins"></i>
        </div>

        <div className="stat-card pengguna">
          <div className="stat-info">
            <h2>Pengguna Aktif</h2>
            <p>5</p>
          </div>
          <i className="fas fa-user-friends"></i>
        </div>
      </div>

      {/* Grafik Penjualan */}
      <Card className="rounded-2xl shadow-lg bg-white border">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Penjualan Mingguan
          </h2>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={salesData}>
                <XAxis dataKey="day" tick={{ fill: "#555" }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#d4a373" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

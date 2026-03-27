import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../css/Layout.css";

export default function Layout() {
  return (
    <div className="app-container">
      <div className="layout">
        <Sidebar />
        <main className="content">
          <Navbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

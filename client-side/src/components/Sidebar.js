import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import "../css/Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      {/* Header Logo + Toggle */}
      <div className="sidebar-header">
        <div className="logo">
          {isOpen && <span className="logo-text">Becer Mart</span>}
        </div>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas ${isOpen ? "fa-angle-left" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-home"></i>
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/product">
              <i className="fas fa-box"></i>
              {isOpen && <span>Produk</span>}
            </Link>
          </li>
          <li>
            <Link to="/transaction">
              <i className="fas fa-cash-register"></i>
              {isOpen && <span>Transaksi</span>}
            </Link>
          </li>
          <li>
            <Link to="/report">
              <i className="fas fa-chart-line"></i>
              {isOpen && <span>Laporan</span>}
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <i className="fas fa-cog"></i>
              {isOpen && <span>Pengaturan</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout mirip menu */}
      <div className="sidebar-footer">
        <ul>
          <li onClick={handleLogout}>
            <a href="#!">
              <i className="fas fa-sign-out-alt"></i>
              {isOpen && <span>Logout</span>}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

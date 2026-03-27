import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const businessName = useSelector((state) => state.auth.businessName);

  const menuRef = useRef(null);

  const paths = location.pathname.split("/").filter(Boolean);

  // mapping path ke label custom
  const labelMap = {
    dashboard: "Dashboard",
    product: "Produk",
    add: "Tambah Produk",
    edit: "Edit Produk",
    transaksi: "Transaksi",
    // bisa tambah lagi sesuai kebutuhan
  };

  // helper capitalize
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const breadcrumb = paths.map((path, index) => {
    const url = "/" + paths.slice(0, index + 1).join("/");
    const label = labelMap[path] || capitalize(path);

    return (
      <span key={index} className="breadcrumb">
        <Link to={url}>{label}</Link>
        {index < paths.length - 1 && " > "}
      </span>
    );
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      // kalau klik di luar user-menu dan tombol user
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      {/* Left: Breadcrumb */}
      <div className="navbar-left">
        {paths.length === 0 ? "Dashboard" : breadcrumb}
      </div>

      {/* Right: User */}
      <div className="navbar-right" ref={menuRef}>
        <button
          className="user-btn"
          type="button"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <i className="fas fa-user-circle user-icon"></i>
          <span>{businessName}</span>
        </button>

        {openMenu && (
          <div className="user-menu">
            <Link to="/settings" onClick={() => setOpenMenu(false)}>
              <i className="fas fa-cog"></i> Pengaturan
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpenMenu(false);
                // TODO: logout function di sini
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

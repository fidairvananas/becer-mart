import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const menuRef = useRef(null);

  const paths = location.pathname.split("/").filter(Boolean);

  const breadcrumb = paths.map((path, index) => {
    const url = "/" + paths.slice(0, index + 1).join("/");
    return (
      <span key={index} className="breadcrumb">
        <Link to={url}>{path}</Link>
        {index < paths.length - 1 && " / "}
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
          <span>{user}</span>
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

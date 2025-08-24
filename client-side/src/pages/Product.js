import React, { useState } from "react";
import "../css/Product.css";

export default function Product() {
  // Dummy data 1000 produk
  const categories = ["Minuman", "Makanan", "Snack", "Kopi", "Teh", "Rokok"];

  const products = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    code: `P-${String(i + 1).padStart(4, "0")}`,
    name: `Produk ${i + 1}`,
    desc: `Deskripsi singkat produk ${i + 1}`,
    stock: Math.floor(Math.random() * 200) + 1,
    price: Math.floor(Math.random() * 50000) + 5000,
    sellPrice: Math.floor(Math.random() * 70000) + 10000,
    category: categories[Math.floor(Math.random() * categories.length)],
  }));

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;

  // 🔎 Filter produk berdasarkan pencarian (code & name)
  const filteredProducts = products.filter(
    (p) =>
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Daftar Produk</h1>
        <div className="actions">
          {/* 🔎 Search input */}
          <input
            type="text"
            placeholder="Cari kode atau nama produk..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset ke halaman pertama setelah search
            }}
            className="search-input"
          />
          <button className="btn-add">+ Tambah Produk</button>
        </div>
      </div>

      {/* Table Produk */}
      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Produk</th>
            <th>Nama Produk</th>
            <th>Deskripsi</th>
            <th>Stok</th>
            <th>Harga Modal</th>
            <th>Harga Jual</th>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((p, index) => (
              <tr key={p.id}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>{p.desc}</td>
                <td>{p.stock}</td>
                <td>Rp {p.price.toLocaleString("id-ID")}</td>
                <td>Rp {p.sellPrice.toLocaleString("id-ID")}</td>
                <td>{p.category}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Hapus</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="no-data">
                ❌ Produk tidak ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

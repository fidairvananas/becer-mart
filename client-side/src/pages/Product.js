import "../css/Product.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../features/productSlice";

export default function Product() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

      <div className="table-container">
        <table className="product-table">
          <colgroup>
            <col style={{ width: "50px" }} /> {/* No */}
            <col style={{ width: "120px" }} /> {/* Kode Produk */}
            <col style={{ width: "160px" }} /> {/* Nama Produk */}
            <col style={{ width: "220px" }} /> {/* Deskripsi */}
            <col style={{ width: "120px" }} /> {/* Harga Modal */}
            <col style={{ width: "120px" }} /> {/* Harga Jual */}
            <col style={{ width: "100px" }} /> {/* Diskon */}
            <col style={{ width: "100px" }} /> {/* Margin */}
            <col style={{ width: "100px" }} /> {/* Stok */}
            <col style={{ width: "100px" }} /> {/* Unit */}
            <col style={{ width: "160px" }} /> {/* Tanggal Kadaluarsa */}
            <col style={{ width: "140px" }} /> {/* Kategori */}
            <col style={{ width: "120px" }} /> {/* Status */}
            <col style={{ width: "160px" }} /> {/* Aksi */}
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Produk</th>
              <th>Nama Produk</th>
              <th>Deskripsi</th>
              <th>Harga Modal</th>
              <th>Harga Jual</th>
              <th>Diskon</th>
              <th>Margin</th>
              <th>Stok</th>
              <th>Unit</th>
              <th>Tanggal Kadaluarsa</th>
              <th>Kategori</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((p, index) => (
                <tr key={p.id}>
                  <td style={{ textAlign: "center" }}>
                    {indexOfFirst + index + 1}
                  </td>
                  <td>{p.code}</td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>Rp {p.priceBuy.toLocaleString("id-ID")}</td>
                  <td>Rp {p.priceSell.toLocaleString("id-ID")}</td>
                  <td>{p.diskon}</td>
                  <td>{p.margin}</td>
                  <td>{p.stock}</td>
                  <td>{p.unit}</td>
                  <td>{p.expiryDate}</td>
                  <td>{p.category}</td>
                  <td>{p.status}</td>
                  <td className="aksi-cell">
                    <button className="btn-update">Edit</button>
                    <button className="btn-delete">Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="no-data">
                  ❌ Produk tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1 || currentProducts.length === 0}
        >
          ⬅ Sebelumnya
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || currentProducts.length === 0}
        >
          Selanjutnya ➡
        </button>
      </div>
    </div>
  );
}

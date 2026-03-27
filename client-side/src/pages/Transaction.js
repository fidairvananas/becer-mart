import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Transaction.css";

export default function Transaction() {
  const [items, setItems] = useState([
    {
      barcode: "MA002",
      name: "Indomie Goreng",
      price: 2500,
      qty: 1,
      discount: 0,
    },
    {
      barcode: "MA003",
      name: "Indomie Soto Kuah",
      price: 2500,
      qty: 3,
      discount: 500,
    },
    { barcode: "MA001", name: "Pop Mie", price: 5000, qty: 1, discount: 0 },
  ]);
  const [date, setDate] = useState(new Date());

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = items.reduce((sum, i) => sum + i.discount, 0);
  const grandTotal = subtotal - discount;

  const [cash, setCash] = useState(20000);
  const change = cash - grandTotal;

  return (
    <div className="transaction-container">
      <h2>Sales / Penjualan</h2>

      {/* --- Card Container --- */}
      <div className="trans-card-container">
        {/* Card 1: Date, Kasir, Customer */}
        <div className="trans-card">
          <div className="datepicker-wrapper">
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="dd-MM-yyyy"
              className="date-input with-icon"
              onChangeRaw={(e) => e.preventDefault()} // cegah ketik manual
            />
            <i className="fas fa-calendar-alt calendar-icon"></i>
          </div>
          <div className="field-group">
            <label>Kasir</label>
            <input type="text" className="form-control-sm" />
          </div>
          <div className="field-group">
            <label>Customer</label>
            <select>
              <option>Umum</option>
            </select>
          </div>
        </div>

        {/* Card 2: Barcode & Qty */}
        <div className="trans-card">
          <div className="field-group">
            <label>Barcode</label>
            <input type="text" placeholder="Scan / Input barcode" />
          </div>
          <div className="field-group">
            <label>Qty</label>
            <input type="number" defaultValue={1} />
          </div>
          <button className="btn-add">+ Add</button>
        </div>

        {/* Card 3: Invoice */}
        <div className="trans-card invoice-card">
          <p>
            Invoice <b>YP1902090002</b>
          </p>
          <h1>{grandTotal}</h1>
        </div>
      </div>

      {/* --- Table Items --- */}
      <table className="trans-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Barcode</th>
            <th>Product Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{i.barcode}</td>
              <td>{i.name}</td>
              <td>{i.price}</td>
              <td>{i.qty}</td>
              <td>{i.discount}</td>
              <td>{i.price * i.qty - i.discount}</td>
              <td>
                <button className="btn-update">Update</button>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- Footer transaksi --- */}
      <div className="trans-footer">
        <div>
          <label>Sub Total</label>
          <input type="text" value={subtotal} readOnly />
          <label>Discount</label>
          <input type="text" value={discount} readOnly />
          <label>Grand Total</label>
          <input type="text" value={grandTotal} readOnly />
        </div>

        <div>
          <label>Cash</label>
          <input
            type="number"
            value={cash}
            onChange={(e) => setCash(+e.target.value)}
          />
          <label>Change</label>
          <input type="text" value={change} readOnly />
          <label>Note</label>
          <textarea defaultValue="yukcoding.id"></textarea>
        </div>
      </div>

      <div className="trans-actions">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-process">Process Payment</button>
      </div>
    </div>
  );
}

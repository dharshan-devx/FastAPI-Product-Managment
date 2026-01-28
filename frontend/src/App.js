import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./App.css";
import TaglineSection from "./TaglineSection";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
});

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } catch {
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let data = [...products];
    const q = filter.toLowerCase();

    if (q) {
      data = data.filter(
        (p) =>
          String(p.id).includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    data.sort((a, b) => {
      let x = a[sortField];
      let y = b[sortField];

      if (["id", "price", "quantity"].includes(sortField)) {
        x = Number(x);
        y = Number(y);
      } else {
        x = x.toLowerCase();
        y = y.toLowerCase();
      }

      return sortDirection === "asc" ? x > y ? 1 : -1 : x < y ? 1 : -1;
    });

    return data;
  }, [products, filter, sortField, sortDirection]);

  const handleSort = (field) => {
    if (field === sortField)
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ id: "", name: "", description: "", price: "", quantity: "" });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/products/${editId}`, form);
        setMessage("Product updated");
      } else {
        await api.post("/products/", form);
        setMessage("Product created");
      }
      resetForm();
      fetchProducts();
    } catch {
      setError("Operation failed");
    }
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditId(p.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="app-bg">

      {/* Top Bar */}
      <header className="topbar">
        <div className="brand">
          <span className="brand-badge">📦</span>
          <h1>Dhxrshxn Trac</h1>
        </div>

        <div className="top-actions">
          <button className="btn btn-light" onClick={fetchProducts}>
            Refresh
          </button>
        </div>
      </header>

      <div className="container">

        {/* Stats */}
        <div className="stats">
          <div className="chip">Total: {products.length}</div>

          <div className="search">
            <input
              placeholder="Search by id, name or description..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="content-grid">

          {/* Form */}
          <div className="card form-card">
            <h2>{editId ? "Edit Product" : "Add Product"}</h2>

            <form className="product-form" onSubmit={handleSubmit}>
              <input name="id" placeholder="ID" value={form.id} onChange={handleChange} disabled={!!editId} required />
              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
              <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
              <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />

              <div className="form-actions">
                <button className="btn">{editId ? "Update" : "Add"}</button>
                {editId && (
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {message && <div className="success-msg">{message}</div>}
            {error && <div className="error-msg">{error}</div>}
          </div>

          <TaglineSection />

          {/* Table */}
          <div className="card list-card">
            <h2>Products</h2>

            <div className="scroll-x">
              <table className="product-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort("id")} className="sortable">ID</th>
                    <th onClick={() => handleSort("name")} className="sortable">Name</th>
                    <th>Description</th>
                    <th onClick={() => handleSort("price")} className="sortable">Price</th>
                    <th onClick={() => handleSort("quantity")} className="sortable">Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td className="name-cell">{p.name}</td>
                      <td className="desc-cell">{p.description}</td>
                      <td className="price-cell">${p.price}</td>
                      <td><span className="qty-badge">{p.quantity}</span></td>
                      <td>
                        <div className="row-actions">
                          <button className="btn btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                          <button className="btn btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="empty">No products found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

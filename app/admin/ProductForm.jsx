"use client";

import { useState, useEffect } from "react";
import styles from "./Admin.module.scss";

export default function ProductForm({ categories }) {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setImagePreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !price || !category || !file)
      return alert("Fill all fields");

    const toBase64 = (f) =>
      new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = () => res(reader.result);
        reader.onerror = (err) => rej(err);
      });

    const base64Image = await toBase64(file);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        desc,
        price,
        category,
        image: base64Image,
      }),
    });

    if (res.ok) {
      const newProduct = await res.json();
      setProducts([newProduct, ...products]);
      setTitle("");
      setDesc("");
      setPrice("");
      setCategory("");
      setFile(null);
      setImagePreview(null);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className={styles.formCard}>
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product Title"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="preview" className={styles.preview} />
        )}

        <button type="submit">Add Product</button>
      </form>

      <div className={styles.list}>
        {products?.map((p) => (
          <div key={p._id} className={styles.listItem}>
            <img src={p.image || "/placeholder.png"} alt={p.title} />
            <div>
              <b>{p.title}</b>
              <span>{p.desc}</span>
              <span>Rs {p.price}</span>
              <span>Category: {p.category?.title || "Unknown"}</span>
            </div>
            <button
              onClick={() => deleteProduct(p._id)}
              className="bg-red-600 px-2 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

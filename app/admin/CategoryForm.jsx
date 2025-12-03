"use client";

import { useState, useEffect } from "react";
import styles from "./Admin.module.scss";

export default function CategoryForm({ categories, setCategories }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // optional: fetch categories if not passed from parent
  useEffect(() => {
    if (!categories?.length) {
      fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.log(err));
    }
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
    if (!title || !file) return alert("Fill all fields");

    const toBase64 = (f) =>
      new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = () => res(reader.result);
        reader.onerror = (err) => rej(err);
      });

    const base64Image = await toBase64(file);

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, image: base64Image }),
    });

    if (res.ok) {
      const newCat = await res.json();
      setCategories([newCat, ...categories]);
      setTitle("");
      setFile(null);
      setImagePreview(null);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Delete this category?")) return;

    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) setCategories(categories.filter((c) => c._id !== id));
  };

  return (
    <div className={styles.formCard}>
      <h3>Add Category</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="preview" className={styles.preview} />}
        <button type="submit">Add</button>
      </form>

      <div className={styles.list}>
        {categories?.map((cat) => (
          <div key={cat._id} className={styles.listItem}>
            <img src={cat.image} alt={cat.title} />
            <span>{cat.title}</span>
            <button
              onClick={() => deleteCategory(cat._id)}
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

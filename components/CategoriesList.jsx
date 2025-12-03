"use client";

import { useEffect, useState } from "react";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {categories.map((cat) => (
        <div
          key={cat.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            width: "150px",
            textAlign: "center",
          }}
        >
          <img
            src={cat.image} // abhi static "test-image.jpg" hai
            alt={cat.title}
            style={{ width: "100%", height: "100px", objectFit: "cover" }}
          />
          <h4>{cat.title}</h4>
        </div>
      ))}
    </div>
  );
}

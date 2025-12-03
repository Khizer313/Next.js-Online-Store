"use client";

import { useState } from "react";
import CategoryForm from "./CategoryForm";
import ProductForm from "./ProductForm";
import styles from "./Admin.module.scss";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  // ✅ Global categories state for dashboard
  const [categories, setCategories] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") setIsLoggedIn(true);
    else alert("Wrong password!");
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.loginWrapper}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <h1>Admin Dashboard</h1>
      <div className={styles.forms}>
        {/* Pass categories state and setter */}
        <CategoryForm categories={categories} setCategories={setCategories} />
        <ProductForm categories={categories} />
      </div>
    </div>
  );
};

export default AdminPage;

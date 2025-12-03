"use client";

import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { Context } from "../../utils/context";

const Home = () => {
  const {
    products,
    setProducts,
    categories,
    setCategories,
  } = useContext(Context);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // STATIC TEXT (data.js removed)
  const storeName = "City Mall";
  const aboutText =
    "City Mall brings you quality products at affordable prices — trusted by thousands of customers.";

  const pageTitle = storeName;
  const pageDesc = aboutText;

  // 🟦 Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log("Error loading categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // 🟩 Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log("Error loading products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
      </Head>

      <Banner />

      <div className="main-content">
        <div className="layout">
          <Category categories={categories} loading={loadingCategories} />
          <Products products={products} loading={loadingProducts} />
        </div>
      </div>
    </div>
  );
};

export default Home;

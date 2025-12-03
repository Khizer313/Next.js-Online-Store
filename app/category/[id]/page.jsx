"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Products from "../../../components/Products/Products";

const CategoryProductsPage = () => {
  const { id } = useParams();

  const [allProducts, setAllProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const productRes = await fetch("/api/products");
      const productData = await productRes.json();

      setAllProducts(productData || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter products by clicked category
  useEffect(() => {
    if (!id || allProducts.length === 0) return;

    const filtered = allProducts.filter(
      (item) => item?.category?._id === id
    );

    setCategoryProducts(filtered);
  }, [id, allProducts]);

  const categoryTitle =
    categoryProducts?.[0]?.category?.title || "Category Products";

  return (
    <div className="products-page">
      <Head>
        <title>{categoryTitle} | City Mall</title>
      </Head>

      <div className="layout">
        <h2 className="sec-heading">{categoryTitle}</h2>

        <Products products={{ data: categoryProducts }} loading={loading} />
      </div>
    </div>
  );
};

export default CategoryProductsPage;

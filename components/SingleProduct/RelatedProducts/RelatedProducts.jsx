"use client";

import Products from "../../Products/Products";
import Skeleton from "../../skelton/Skelton";
import { useEffect, useState } from "react";

const RelatedProducts = ({ categoryId, productId }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  if (!categoryId) return; // don't fetch if categoryId is null

  const fetchRelated = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?category=${categoryId}`);
      const data = await res.json();

      // Only keep products with the same category
      const filtered = data.filter(
        (p) => p._id !== productId && p.category?._id === categoryId
      );

      setRelated(filtered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchRelated();
}, [categoryId, productId]);


  if (loading) return <Skeleton type="products-grid" />;
  if (related.length === 0) return <p>No related products found.</p>;

  return <Products headingText="Related Products" products={{ data: related }} />;
};

export default RelatedProducts;

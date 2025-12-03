"use client";

import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import Head from "next/head";
import { useRouter } from "next/navigation";
import "./Search.scss";

const Search = ({ setSearchModal }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);    // 🔥 API se data ayega
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // ============================
  // 🔥 Fetch products from API
  // ============================
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/products");  // ⬅️ apni API route dalna
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);


  // ============================
  // 🔍 Filtering based on query
  // ============================
  const filteredProducts =
    query.length > 0
      ? products.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())

    )
    : [];
    return (
      <div className="search-modal">
      <Head>
        <title>
          {query ? `Search results for "${query}"` : "Search"} | City Mall
        </title>
      </Head>

      <div className="form-field">
        <input
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <MdClose
          className="close-btn"
          onClick={() => setSearchModal(false)}
          />
      </div>

      <div className="search-result-content">
        {loading && <div className="start-msg">Loading...</div>}

        {!loading && filteredProducts.length === 0 && query.length > 0 && (
          <div className="start-msg">No products found for {query}.</div>
        )}

        {!loading && filteredProducts.length === 0 && query.length === 0 && (
          <div className="start-msg">
            Start typing to see products you are looking for.
          </div>
        )}

        <div className="search-results">
          {filteredProducts.map((item) => {
            const imgUrl = item.img || "/placeholder.png";

            return (
              <div
                className="search-result-item"
                key={item._id}
                onClick={() => {
                  router.push("/product/" + item._id);
                  setSearchModal(false);
                }}
              >
                <div className="image-container">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="prod-details">
                  <span className="name">{item.title}</span>
                  <span className="desc">{item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;

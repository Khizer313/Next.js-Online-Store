"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import Head from "next/head";
import "./Headers.scss";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";

const Header = () => {
  const { cartCount, showCart, setShowCart } = useContext(Context);

  const [scrolled, setScrolled] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const router = useRouter();

  // STATIC STORE NAME (data.js removed)
  const STORE_NAME = "CITY MALL";

  const handleScroll = () => {
    setScrolled(window.scrollY > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>{STORE_NAME}</title>
        <meta
          name="description"
          content="Shop latest products at City Mall. Explore categories and discover new products."
        />
        <meta property="og:title" content={STORE_NAME} />
        <meta
          property="og:description"
          content="Shop latest products at City Mall. Explore categories and discover new products."
        />
        <meta property="og:image" content="/logo192.png" />
      </Head>

      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => router.push("/")}>Home</li>
            <li><a href="#Category">Categories</a></li>
            <li><a href="#Product">Products</a></li>
            <li><a href="#Footer">About</a></li>
          </ul>

          {/* STATIC STORE NAME */}
          <div className="center" onClick={() => router.push("/")}>
            {STORE_NAME}
          </div>

          <div className="right">
            <TbSearch onClick={() => setSearchModal(true)} />
            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>

      {searchModal && <Search setSearchModal={setSearchModal} />}
      {showCart && <Cart />}
    </>
  );
};

export default Header;

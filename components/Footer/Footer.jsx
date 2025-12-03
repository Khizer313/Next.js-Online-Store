"use client";

import React, { useState, useEffect } from "react";
import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope, FaArrowUp } from "react-icons/fa";
import Head from "next/head";
import Newsletter from "./Newsletter/Newsletter";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // STATIC CONTENT (aik jaga se control hoga)
  const storeName = "City Mall";
  const aboutText =
    "City Mall is your ultimate destination for quality products at affordable prices. We bring comfort, value, and trust to your shopping experience.";
  const address = "Main Boulevard, Lahore, Pakistan";
  const phone = "+92 300 1234567";
  const email = "support@citymall.com";

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div id="Footer" className="footer">
      <Head>
        <title>{storeName} | About & Contact</title>
        <meta name="description" content={aboutText} />
      </Head>

      <Newsletter />

      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">{aboutText}</div>
        </div>

        <div className="col">
          <div className="title">Contact</div>

          <div className="c-item">
            <FaLocationArrow />
            <div className="text">{address}</div>
          </div>

          <div className="c-item">
            <FaMobileAlt />
            <div className="text">Phone: {phone}</div>
          </div>

          <div className="c-item">
            <FaEnvelope />
            <div className="text">Email: {email}</div>
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <span className="text">
            © {storeName} 2025 — Premium E-Commerce Solutions.
          </span>

          <img src="/assets/payments.png" alt="Payment Methods" />
        </div>
      </div>

      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Footer;

"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import "./Banner.scss";

const Banner = () => {
  // 🔥 STATIC SALES CONTENT
  const heading = "Mega Sale!";
  const description =
    "Discover exclusive deals on stylish shirts and sneakers. Grab your favorite colors now and step up your style game! Limited stock available.";

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const beforeInstallHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setCanInstall(false);
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setCanInstall(false);
  };

  return (
    <div className="hero-banner">
      <Head>
        <title>{heading}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={heading} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/assets/banner.png" />
      </Head>

      <div className="content">
        <div className="text-content">
          <h1>{heading}</h1>
          <p>{description}</p>

          <div className="ctas">
            {!isInstalled && canInstall ? (
              <button className="banner-cta install-btn" onClick={handleInstall}>
                Install Our App
              </button>
            ) : (
              <a href="#About" className="banner-cta">Read More</a>
            )}

            <a href="#Product" className="banner-cta v2">
              Shop Now
            </a>
          </div>
        </div>

        <img className="banner-img" src="/assets/banner.png" alt="Sales Banner" />
      </div>
    </div>
  );
};

export default Banner;

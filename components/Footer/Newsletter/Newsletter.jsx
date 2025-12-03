"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Newsletter.scss";
import Head from "next/head";

const Newsletter = () => {
  return (
    <div className="newsletter-section" id="About">
      <Head>
        <title>Newsletter | City Mall</title>
        <meta
          name="description"
          content="Subscribe to our newsletter to stay updated with new products and exclusive offers."
        />
      </Head>

      <div className="newsletter-content">
        <span className="small-text">Newsletter</span>
        <span className="big-text">
          Get the latest updates and exclusive offers delivered directly to your inbox
        </span>

        <div className="form">
          <span className="text">
            Subscribe to our newsletter to stay updated with new products and promotions.
          </span>
        </div>

        <span className="social-icons">
          <div className="icon">
            <FaLinkedinIn size={14} />
          </div>
          <div className="icon">
            <FaFacebookF size={14} />
          </div>
          <div className="icon">
            <FaTwitter size={14} />
          </div>
          <div className="icon">
            <FaInstagram size={14} />
          </div>
        </span>
      </div>
    </div>
  );
};

export default Newsletter;

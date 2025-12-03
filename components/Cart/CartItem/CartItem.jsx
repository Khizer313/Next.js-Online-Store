"use client";

import React, { useContext } from "react";
import { Context } from "../../../utils/context";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";

const CartItem = () => {
  const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
    useContext(Context);

  return (
    <div className="cart-products">
      {cartItems?.map((item) => {
        // ⭐ If img is direct string → use it
        // ⭐ Else fallback to placeholder
        const imgUrl =
          typeof item.img === "string"
            ? item.img
            : "/placeholder.png";
            

        return (
          <div className="search-result-item" key={item?.id}>
            <div className="image-container">
              <img src={imgUrl} alt={item?.title || "Product"} />
            </div>

            <div className="prod-details">
              <span className="name">{item?.title}</span>

              <MdClose
                className="close-btn"
                onClick={() => handleRemoveFromCart(item)}
              />

              <div className="quantity-buttons">
                <span onClick={() => handleCartProductQuantity("dec", item)}>
                  -
                </span>
                <span>{item?.quantity}</span>
                <span onClick={() => handleCartProductQuantity("inc", item)}>
                  +
                </span>
              </div>

              <div className="text">
                <span>{item?.quantity}</span> x{" "}
                <span>&#8377;{item?.price}</span> ={" "}
                <span className="highlight">
                  &#8377;{item?.price * item?.quantity}
                </span>
              </div>

              {/* ⭐ Your only button → WhatsApp */}
              <a
                href={`https://wa.me/923376333235?text=I want to buy: ${item?.title} (Qty: ${item?.quantity})`}
                target="_blank"
                className="whatsapp-btn"
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItem;

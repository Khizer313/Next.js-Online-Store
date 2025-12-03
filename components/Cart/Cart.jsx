"use client";

import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import UserDetailsPopup from "./userDetails/UserDetailsPopup";
import { useRouter } from "next/navigation";

import "./Cart.scss";

const Cart = () => {
  const { cartItems, setShowCart, cartSubTotal } = useContext(Context);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleWhatsappSend = (userDetails) => {
    const { name, address, gali, nearest, homeNumber, city, contact1, contact2 } = userDetails;
    const adminNumber = "923376333235";
    let message = `New Order:%0A`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - Qty: ${item.quantity} - Price: ₹${item.price}%0A`;
    });

    message += `Subtotal: ₹${cartSubTotal}%0A%0A`;
    message += `Customer Details:%0A`;
    message += `Name: ${name}%0AAddress: ${address}%0AGali: ${gali}%0ANearest: ${nearest}%0AHome Number: ${homeNumber}%0ACity: ${city}%0AContact 1: ${contact1}%0A`;
    if (contact2) message += `Contact 2: ${contact2}%0A`;

    window.open(`https://wa.me/${adminNumber}?text=${message}`, "_blank");

    setWhatsappSent(true);
    setShowPopup(false);
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => setShowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button
              className="return-cta"
              onClick={() => {
                router.push("/");
                setShowCart(false);
              }}
            >
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">&#8377;{cartSubTotal}</span>
              </div>
              <div className="button">
                {!whatsappSent && (
                  <button className="whatsapp-cta" onClick={() => setShowPopup(true)}>
                    Send Order on WhatsApp
                  </button>
                )}

               
              </div>
            </div>
          </>
        )}
      </div>

      {showPopup && (
        <UserDetailsPopup
          onClose={() => setShowPopup(false)}
          onSend={handleWhatsappSend}
        />
      )}
    </div>
  );
};

export default Cart;

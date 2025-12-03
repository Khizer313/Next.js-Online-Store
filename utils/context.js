"use client";

import { createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState([]);
  const [abouts, setAbouts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  const pathname = usePathname();

  // Load cart from localStorage only on client
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Update totals and save cart to localStorage
  useEffect(() => {
    let count = 0;
    let subTotal = 0;

    cartItems.forEach((item) => {
      count += item.quantity;
      subTotal += item.price * item.quantity;
    });

    setCartCount(count);
    setCartSubTotal(subTotal);

    // Save to localStorage on client
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleAddToCart = (id, product, quantity) => {
    if (!product || !product.title) return;

    setCartItems((prevItems) => {
      const index = prevItems.findIndex((p) => p.id === id);
      let newCart;

      if (index !== -1) {
        newCart = [...prevItems];
        newCart[index].quantity += quantity;
      } else {
        newCart = [
          ...prevItems,
          {
            id,
            title: product.title,
            price: product.price,
            img: product.image,
            quantity,
          },
        ];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(newCart));
      }
      return newCart;
    });
  };

  const handleRemoveFromCart = (product) => {
    if (!product) return;
    const items = cartItems.filter((p) => p.id !== product.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    if (!product) return;
    const items = [...cartItems];
    const index = items.findIndex((p) => p.id === product.id);
    if (index === -1) return;

    let currentQuantity = items[index].quantity;
    if (type === "inc") items[index].quantity = currentQuantity + 1;
    if (type === "dec" && currentQuantity > 1) items[index].quantity = currentQuantity - 1;

    setCartItems(items);
  };

  const clearCart = () => setCartItems([]);

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        name,
        setName,
        abouts,
        setAbouts,
        contacts,
        setContacts,
        cartItems,
        setCartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartProductQuantity,
        cartCount,
        cartSubTotal,
        showCart,
        setShowCart,
        clearCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;

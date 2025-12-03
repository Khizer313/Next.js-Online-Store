"use client"; // Important: Next.js client component

import { createContext, useState, useEffect } from "react";
// import { useLocation } from "react-router-dom"; // ❌ Remove this
import { usePathname } from "next/navigation"; // ✅ Next.js hook

export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState([]);
  const [abouts, setAbouts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const clearCart = () => setCartItems([]);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  // ✅ Next.js path tracking
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // scroll on path change

  // Update cart totals and save to localStorage whenever cartItems change
  useEffect(() => {
    let count = 0;
    let subTotal = 0;

    cartItems.forEach((item) => {
      count += item.quantity;
      subTotal += item.price * item.quantity;
    });

    setCartCount(count);
    setCartSubTotal(subTotal);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
          id: id,
          title: product.title,
          price: product.price,
          img: product.image, // ✔ FIX
          quantity,
        },
      ];
    }

    localStorage.setItem("cartItems", JSON.stringify(newCart));
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

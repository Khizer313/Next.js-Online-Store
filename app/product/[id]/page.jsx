"use client";

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import RelatedProducts from "../../../components/SingleProduct/RelatedProducts/RelatedProducts";
import { Context } from "../../../utils/context";
import { FaCartPlus } from "react-icons/fa";
import styles from "./SingleProduct.module.scss";

const SingleProductPage = () => {
  const { id } = useParams();
  const { handleAddToCart } = useContext(Context);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setProduct(null); // reset previous product
    setLoading(true);

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products`); // fetch all products
        const data = await res.json();

        // find the product with the clicked id
        const p = data.find((item) => item._id === id);
        if (p) {
          setProduct({
            ...p,
            image: p.image,
            categoryId: p.category?._id,
            categoryTitle: p.category?.title || "Unknown",
          });
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found!</div>;

  return (
    <div key={id} className={styles.singleProductMainContent}>
      <div className="layout">
        <div className={styles.singleProductPage}>
          <div className={styles.left}>
            <img src={product.image || "/placeholder.png"} alt={product.title} />
          </div>
          <div className={styles.right}>
            <span className={styles.name}>{product.title}</span>
            <span className={styles.price}>₹{product.price * quantity}</span>
            <span className={styles.desc}>{product.desc}</span>
            <div className={styles.cartButtons}>
              <div className={styles.quantityButtons}>
                <span onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</span>
                <span>{quantity}</span>
                <span onClick={() => setQuantity(q => q + 1)}>+</span>
              </div>
              <button
                className={styles.addToCartButton}
                onClick={() => handleAddToCart(id, product, quantity)}
              >
                <FaCartPlus size={20} /> ADD TO CART
              </button>
            </div>
            <span className={styles.divider} />
            <div className={styles.infoItem}>
              <span className={styles.textBold}>
                Category: <span>{product.categoryTitle}</span>
              </span>
            </div>
          </div>
        </div>

        <RelatedProducts categoryId={product.categoryId} productId={product._id} />
      </div>
    </div>
  );
};

export default SingleProductPage;

"use client";

import { useRouter } from "next/navigation";
import "./Product.scss";

const Product = ({ data }) => {
  const router = useRouter();

  const imgUrl = data?.image || "/placeholder.png";
  const productId = data?._id; // ⭐ FIX HERE — always use _id

  return (
    <div
      id="Product"
      className="product-card"
      onClick={() => router.push(`/product/${productId}`)}
    >
      <div className="thumbnail">
        <img src={imgUrl} alt={data?.title} />
      </div>
      <div className="prod-details">
        <span className="name">{data?.title}</span>
        <span className="price">₹{data?.price}</span>
      </div>
    </div>
  );
};

export default Product;

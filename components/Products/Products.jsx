"use client";

import Product from "./Product/Product";
import Skeleton from "../skelton/Skelton";
import "./Products.scss";

const Products = ({ products, headingText = "Our Products" }) => {
  // ✅ Handle both array and object shape
  const productItems = Array.isArray(products) ? products : products?.data || [];
  const showSkeleton = productItems.length === 0;

  return (
    <div className="products-container" id="Products">
      <h2 className="sec-heading">{headingText}</h2>

      <div className="products">
        {showSkeleton
          ? Array.from({ length: 4 }, (_, i) => <Skeleton key={i} type="product" />)
          : productItems.map((item, index) => (
              <Product
                key={item._id || item.id || index} // 🔑 Unique key
                data={item}
                id={item._id || item.id || index}  // Product id fallback
              />
            ))}
      </div>
    </div>
  );
};

export default Products;

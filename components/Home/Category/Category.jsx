"use client";

import { useRouter } from "next/navigation";
import Head from "next/head";
import Skeleton from "../../skelton/Skelton";
import "./Category.scss";

const Category = ({ categories }) => {
  const router = useRouter();

  const showSkeleton = !categories || categories.length === 0;

  return (
    <div id="Category" className="shop-by-category">
      <Head>
        <title>Shop by Categories | City Mall</title>
        <meta
          name="description"
          content="Browse and select categories to view related products."
        />
      </Head>

      <div className="categories">
        {showSkeleton
          ? Array(4)
              .fill(0)
              .map((_, i) => <Skeleton key={i} type="category" />)
          : categories.map((item) => {
              const imageUrl = item?.image || "/placeholder.png";

              return (
                <div
                  key={item._id}
                  className="category-card"
                  onClick={() => router.push(`/category/${item._id}`)}
                >
                  <div className="category-img">
                    <img src={imageUrl} alt={item.title} />
                  </div>
                  <h3>{item.title}</h3>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Category;

"use client";

import "./Skelton.scss";

const Skeleton = ({ type }) => (
  <div className={`skeleton ${type}`}>
    <div className="skeleton-shimmer"></div>
  </div>
);

export default Skeleton;

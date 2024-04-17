import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = ({ count = 1 }) => {
  return (
    <div className="px-4">
      <Skeleton count={count} className="h-[92px] mb-2" />
    </div>
  );
};

export default SkeletonCard;

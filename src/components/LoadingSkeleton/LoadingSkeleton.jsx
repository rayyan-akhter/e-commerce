import React from "react";
import "./LoadingSkeleton.css";

const LoadingSkeleton = ({ 
  type = "card", 
  count = 1, 
  className = "",
  height,
  width 
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return <div className="skeleton-card" />;
      case "product":
        return <div className="skeleton-product" />;
      case "text":
        return <div className="skeleton-text" style={{ height, width }} />;
      case "circle":
        return <div className="skeleton-circle" style={{ height, width }} />;
      case "button":
        return <div className="skeleton-button" />;
      case "image":
        return <div className="skeleton-image" style={{ height, width }} />;
      default:
        return <div className="skeleton-card" />;
    }
  };

  if (count === 1) {
    return (
      <div className={`skeleton-wrapper ${className}`}>
        {renderSkeleton()}
      </div>
    );
  }

  return (
    <div className={`skeleton-grid ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="skeleton-wrapper">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton; 
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BarNav from "../components/BarNav";
import "../css/SearchResults.css"; // Ensure you have a CSS file for styling

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { products } = location.state || { products: [] };

  const handleProductClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <div className="container">
      <div>
        <BarNav />
      </div>
      <h1>Results</h1>
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.productId)}
            >
              <img
                src={`http://localhost:8080/greenmart/uploads/images/${product.imageUrl}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h2>{product.productName}</h2>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default SearchResults;

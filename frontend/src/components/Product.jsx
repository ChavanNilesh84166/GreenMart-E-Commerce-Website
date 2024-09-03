import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProductToWishlist, addProductToCart } from '../services/products'; // Ensure these services are imported
import '../css/Product.css'; // Ensure the CSS file is imported
import { toast } from "react-toastify";

function Product({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false); // Track wishlist state
  const navigate = useNavigate();

  const getShortDetails = () => {
    return product.description.length > 50
      ? `${product.description.substr(0, 50)}...`
      : product.description;
  };

  const onProductClick = () => {
    navigate(`/product-details/${product.productId}`);
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation(); // Prevent triggering onProductClick
    const customerId = sessionStorage.getItem('customerid');
    if (!customerId) {
      console.error('Customer ID is not available');
      return;
    }
    try {
      await addProductToWishlist(customerId, product.productId);
      setIsInWishlist(true); // Update local state to reflect that the product is in the wishlist
      toast.success("Product Added To Wishlist");
    } catch (error) {
      console.error('Failed to add product to wishlist:', error);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent triggering onProductClick
    const customerId = sessionStorage.getItem('customerid');
    if (!customerId) {
      console.error('Customer ID is not available');
      return;
    }
    try {
      await addProductToCart(customerId, product.productId, 1);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  return (
    <div onClick={onProductClick} className="product-card">
      <div className="card">
        <img
          className="card-img-top"
          src={product.imageUrl}
          alt={product.productName}
        />
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">{getShortDetails()}</p>
          <div className="product-price">₹ {product.price}</div>
          <div className="product-actions">
            <button
              className={`btn wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
              onClick={handleAddToWishlist}
            >
              <i className={`fa${isInWishlist ? 's' : 'r'} fa-heart`}></i>
            </button>
            <button
              className="btn cart-btn"
              onClick={handleAddToCart}
            >
              <i className="fas fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;

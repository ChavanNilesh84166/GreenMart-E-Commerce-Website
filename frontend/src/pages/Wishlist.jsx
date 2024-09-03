import React, { useEffect, useState } from 'react';
import { getWishlistProducts, removeProductFromWishlist } from '../services/products';
import { useNavigate } from 'react-router-dom';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const customerId = sessionStorage.getItem('customerid');
  const navigate = useNavigate();

  const loadWishlistProducts = async (customerId) => {
    try {
      const products = await getWishlistProducts(customerId);
      setWishlistItems(products);
    } catch (error) {
      console.error('Failed to fetch wishlist products:', error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      await removeProductFromWishlist(customerId, productId);
      loadWishlistProducts(customerId);
    } catch (error) {
      console.error('Failed to remove product from wishlist:', error);
    }
  };

  useEffect(() => {
    if (customerId) {
      loadWishlistProducts(customerId);
    } else {
      console.error('No customer ID found in session storage');
    }
  }, [customerId]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#4CAF50' }}>Your Wishlist</h2>
      {wishlistItems.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {wishlistItems.map((item) => (
            <div
              key={item.productId}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px',
                width: '80%',
                textAlign: 'left',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 style={{ marginBottom: '10px', color: '#333' }}>{item.productName}</h3>
              <img
                style={{ height: '100px', width: '100px', borderRadius: '10px' }}
                src={item.imageUrl}
                alt={item.productName}
              />
              <p style={{ margin: '10px 0', color: '#777' }}>Category: {item.categoryName}</p>
              <p style={{ margin: '10px 0', color: '#777' }}>Price: {item.price}</p>
              <p style={{ margin: '10px 0', color: '#777' }}>Stock: {item.stock}</p>
              <button
                onClick={() => handleRemoveProduct(item.productId)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#777' }}>Your wishlist is empty.</p>
      )}
    </div>
  );
}

export default Wishlist;

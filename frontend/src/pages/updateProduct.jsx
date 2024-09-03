import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { updateProduct } from '../services/products';

const UpdateProduct = () => {
  const { sellerId } = useParams(); // Get productId and sellerId from URI parameters
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { product } = location.state || {}; // Get product from location state

  const [productName, setProductName] = useState(product.productName || '');
  const [description, setDescription] = useState(product.description || '');
  const [stock, setStock] = useState(product.stock || '');
  const [price, setPrice] = useState(product.price || '');
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedFields = [
        { fieldName: 'productName', value: productName },
        { fieldName: 'description', value: description },
        { fieldName: 'stock', value: stock },
        { fieldName: 'price', value: price },
      ];
      await updateProduct(product.productId, updatedFields);
      navigate(`/viewProduct/${sellerId}`); // Redirect after update
    } catch (error) {
      setError("Error updating product: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
    <Navbar />
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      <main style={{
        padding: '20px',
        margin: '20px auto',
        maxWidth: '800px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          color: '#00796b',
          marginBottom: '20px',
          textAlign: 'center'
        }}>Update Product</h2>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <form onSubmit={handleUpdate}>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="productName" style={{ fontWeight: 'bold', color: '#00796b' }}>Product Name</label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="description" style={{ fontWeight: 'bold', color: '#00796b' }}>Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="stock" style={{ fontWeight: 'bold', color: '#00796b' }}>Stock</label>
                <input
                  type="number"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="price" style={{ fontWeight: 'bold', color: '#00796b' }}>Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>
              <div style={{ marginTop: '20px' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#00796b',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
    </div>
  );
};

export default UpdateProduct;

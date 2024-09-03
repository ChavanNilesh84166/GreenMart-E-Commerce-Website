import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsForSeller, deleteProduct } from "../services/products";
import Navbar from '../components/Navbar';

function ViewProduct() {
  const { sellerId } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsForSeller(sellerId);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [sellerId]);

  const handleUpdateClick = (product) => {
    navigate(`/updateProduct/${product.productId}/${sellerId}`, { state: { product } });
  };

  const handleDeleteClick = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.productId !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (

    <div style={{ textAlign: "center", padding: "50px 0" }}>
    <Navbar />
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      <main style={{
        padding: '20px',
        margin: '20px auto',
        maxWidth: '1000px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          marginBottom: '20px',
          color: '#00796b',
          textAlign: 'center'
        }}>Product List</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            marginBottom: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid #dddddd'
          }}>
            <thead>
              <tr>
                <th style={{
                  border: '1px solid #dddddd',
                  padding: '10px',
                  textAlign: 'center'
                }}>Product Id</th>
                <th style={{
                  border: '1px solid #dddddd',
                  padding: '10px',
                  textAlign: 'center'
                }}>Product Name</th>
                <th style={{
                  border: '1px solid #dddddd',
                  padding: '10px',
                  textAlign: 'center'
                }}>Description</th>
                <th style={{
                  border: '1px solid #dddddd',
                  padding: '10px',
                  textAlign: 'center'
                }}>Stock</th>
                <th style={{
                  border: '1px solid #dddddd',
                  padding: '10px',
                  textAlign: 'center'
                }}>Image</th>
                <th style={{
                  border: '1px solid #dddddd',
                  padding: '10px',
                  textAlign: 'center'
                }}>Price</th>
                <th style={{
                  border: '1px solid #dddddd',
                  padding: '10px',
                  textAlign: 'center'
                }}>Category Name</th>
                <th style={{
                  border: '1px solid #dddddd',
                  padding: '10px',
                  textAlign: 'center'
                }} colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productId}>
                  <td style={{
                    border: '1px solid #dddddd',
                    padding: '10px',
                    textAlign: 'center'
                  }}>{product.productId}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    padding: '10px',
                    textAlign: 'center'
                  }}>{product.productName}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    padding: '10px',
                    textAlign: 'center'
                  }}>{product.description}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    padding: '10px',
                    textAlign: 'center'
                  }}>{product.stock}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    padding: '10px',
                    textAlign: 'center'
                  }}>
                    <img src={product.imageUrl} alt={product.productName} style={{ width: '100px', height: 'auto' }} />
                  </td>
                  <td style={{
                    border: '1px solid #dddddd',
                    padding: '10px',
                    textAlign: 'center'
                  }}>{product.price}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    padding: '10px',
                    textAlign: 'center'
                  }}>{product.categoryName}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    padding: '10px',
                    textAlign: 'center'
                  }}>
                    <button
                      style={{
                        backgroundColor: '#ffc107',
                        color: '#ffffff',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        textDecoration: 'none'
                      }}
                      onClick={() => handleUpdateClick(product)}
                    >
                      Update
                    </button>
                  </td>
                  <td style={{
                    border: '1px solid #dddddd',
                    padding: '10px',
                    textAlign: 'center'
                  }}>
                    <button
                      style={{
                        backgroundColor: '#dc3545',
                        color: '#ffffff',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px'
                      }}
                      onClick={() => handleDeleteClick(product.productId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
    </div>
  );
}

export default ViewProduct;

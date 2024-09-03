import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { getTotalProductCount, getOrderCounts } from "../services/products";

function SellerDashBoard() {
  const navigate = useNavigate();
  const sellerId = sessionStorage.getItem("sellerid");

  // State for product and order counts
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [shippedCount, setShippedCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch total product count
        const productCount = await getTotalProductCount(sellerId);
        setTotalProductCount(productCount);

        // Fetch order counts
        const orderCounts = await getOrderCounts(sellerId);
        setPendingCount(orderCounts.pendingCount);
        setShippedCount(orderCounts.shippedCount);
        setDeliveredCount(orderCounts.deliveredCount);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCounts();
  }, [sellerId]);

  // Navigation handler for AddProduct
  const handleAddProductClick = () => {
    navigate(`/add-product/${sellerId}`);
  };

  const handleViewProductClick = () => {
    navigate(`/viewProduct/${sellerId}`);
  };

  const handleViewPendingOrdersClick = () => {
    navigate(`/viewPendingOrder/${sellerId}`);
  };

  const handleViewShippedOrdersClick = () => {
    navigate(`/viewShippedOrder/${sellerId}`);
  };

  const handleViewDeliveredOrdersClick = () => {
    navigate(`/viewDeliveredOrder/${sellerId}`);
  };

  const handleViewProfileClick = () => {
    navigate(`/sellerProfile/${sellerId}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
      <Navbar />
      <h1 style={{ marginBottom: "50px", marginTop: 100 }}>SELLER DASHBOARD</h1>
      <div>
        {/* Sidebar Navigation */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <nav className="sidebar">
                <ul className="nav-menu">
                  <div className="sidebar-menu">
                    <button
                      onClick={handleViewProfileClick}
                      style={buttonStyle}
                    >
                      Profile
                    </button>
                  </div>
                  <div className="sidebar-menu">
                    <button
                      onClick={handleViewProductClick}
                      style={buttonStyle}
                    >
                      View Product
                    </button>
                  </div>
                  <div className="sidebar-menu">
                    <button
                      onClick={handleViewPendingOrdersClick}
                      style={buttonStyle}
                    >
                      View Pending Orders
                    </button>
                  </div>
                  <div className="sidebar-menu">
                    <button
                      onClick={handleViewShippedOrdersClick}
                      style={buttonStyle}
                    >
                      View Shipped Orders
                    </button>
                  </div>
                  <div className="sidebar-menu">
                    <button
                      onClick={handleViewDeliveredOrdersClick}
                      style={buttonStyle}
                    >
                      View Delivered Orders
                    </button>
                  </div>
                  <div className="sidebar-menu">
                    <button
                      onClick={handleAddProductClick}
                      style={buttonStyle}
                    >
                      Add Product
                    </button>
                  </div>
                </ul>
              </nav>
            </div>

            {/* Dashboard Content */}
            <div className="col-md-9">
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <div style={cardStyle}>
                  <p style={labelStyle}>Total Products</p>
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    <p style={countStyle}>
                      <span>{totalProductCount}</span>
                    </p>
                  )}
                </div>

                <div style={cardStyle}>
                  <p style={labelStyle}>Total Pending Orders</p>
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    <p style={countStyle}>
                      <span>{pendingCount}</span>
                    </p>
                  )}
                </div>

                <div style={cardStyle}>
                  <p style={labelStyle}>Total Shipped Orders</p>
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    <p style={countStyle}>
                      <span>{shippedCount}</span>
                    </p>
                  )}
                </div>

                <div style={cardStyle}>
                  <p style={labelStyle}>Total Delivered Orders</p>
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    <p style={countStyle}>
                      <span>{deliveredCount}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashBoard;

// Inline CSS styles
const buttonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 15px',
  margin: '5px 0',
  cursor: 'pointer',
  fontSize: '16px',
  textAlign: 'center',
  width: '100%',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
};

const cardStyle = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  padding: '30px',
  textAlign: 'center',
  marginBottom: '20px',
  width: 'calc(50% - 30px)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const labelStyle = {
  fontSize: '16px',
  color: '#6c757d',
};

const countStyle = {
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '10px 0',
};

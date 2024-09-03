import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllOrderCounts, getAllProductCount, getTotalUsers, getTotalSellers } from '../services/products';

function AdminDashboard() {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("customerid"); // Example adminId, replace with dynamic value if needed

    // State for product and order counts
    const [allProductCount, setAllProductCount] = useState(0);
    const [allOrderCount, setAllOrderCount] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalSellers, setTotalSellers] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Fetch total product count
                const productCount = await getAllProductCount();
                setAllProductCount(productCount);

                // Fetch order counts
                const orderCounts = await getAllOrderCounts();
                setAllOrderCount(orderCounts);

                const totalUsers = await getTotalUsers();
                setTotalUsers(totalUsers);

                const totalSellers = await getTotalSellers();
                setTotalUsers(totalSellers);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCounts();
    }, [userId]);

    // Navigation handlers
    const handleViewAllProductClick = () => {
        navigate("/viewAllProduct");
    };

    const handleViewAllPendingOrdersClick = () => {
        navigate("/viewAllPendingOrder");
    };

    const handleViewAllShippedOrdersClick = () => {
        navigate("/viewAllShippedOrder");
    };

    const handleViewAllDeliveredOrdersClick = () => {
        navigate("/viewAllDeliveredOrder");
    };

    const handleViewProfileClick = () => {
        navigate(`/adminProfile/${userId}`);
    };

    const handleViewUsersClick = () => {
        navigate("/viewCustomer");
    };

    const handleViewSellersClick = () => {
        navigate("/viewSeller");
    };

    return (

        <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Navbar />
            <h1 style={{ marginBottom: "50px", marginTop: 100 }}>ADMIN DASHBOARD</h1>
            <div style={{ fontFamily: 'Arial, sans-serif', margin: 0 }}>
                {/* Sidebar Navigation */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <nav style={{
                                backgroundColor: '#f8f9fa',
                                borderRight: '1px solid #dee2e6',
                                padding: '15px'
                            }}>
                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                    <div style={{ marginBottom: '15px' }}>
                                        <button
                                            onClick={handleViewProfileClick}
                                            style={buttonStyle}
                                        >
                                            Profile
                                        </button>
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <button
                                            onClick={handleViewUsersClick}
                                            style={buttonStyle}
                                        >
                                            View Users
                                        </button>
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <button
                                            onClick={handleViewSellersClick}
                                            style={buttonStyle}
                                        >
                                            View Sellers
                                        </button>
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <button
                                            onClick={handleViewAllProductClick}
                                            style={buttonStyle}
                                        >
                                            View All Product
                                        </button>
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <button
                                            onClick={handleViewAllPendingOrdersClick}
                                            style={buttonStyle}
                                        >
                                            View All Pending Orders
                                        </button>
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <button
                                            onClick={handleViewAllShippedOrdersClick}
                                            style={buttonStyle}
                                        >
                                            View All Shipped Orders
                                        </button>
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <button
                                            onClick={handleViewAllDeliveredOrdersClick}
                                            style={buttonStyle}
                                        >
                                            View All Delivered Orders
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
                                            <span>{allProductCount}</span>
                                        </p>
                                    )}
                                </div>

                                <div style={cardStyle}>
                                    <p style={labelStyle}>Total Orders</p>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>Error: {error}</p>
                                    ) : (
                                        <p style={countStyle}>
                                            <span>{allOrderCount}</span>
                                        </p>
                                    )}
                                </div>

                                <div style={cardStyle}>
                                    <p style={labelStyle}>Total Users</p>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>Error: {error}</p>
                                    ) : (
                                        <p style={countStyle}>
                                            <span>{totalUsers}</span>
                                        </p>
                                    )}
                                </div>

                                <div style={cardStyle}>
                                    <p style={labelStyle}>Total Sellers</p>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p>Error: {error}</p>
                                    ) : (
                                        <p style={countStyle}>
                                            <span>{totalSellers}</span>
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

export default AdminDashboard;

// Inline CSS styles
const buttonStyle = {
    backgroundColor: '#28a745', // Green color
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
    padding: '30px', // Increased padding for larger cards
    textAlign: 'center',
    marginBottom: '20px',
    width: 'calc(50% - 30px)', // Make the cards wider
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

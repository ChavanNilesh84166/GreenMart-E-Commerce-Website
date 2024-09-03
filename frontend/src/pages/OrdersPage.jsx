import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BarNav from '../components/BarNav';
import config from "../config";

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const { customerId } = useParams();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `${config.url}/orders/getAllOrderById/${customerId}`
                );
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [customerId]);

    if (orders.length === 0) {
        return <div style={{ textAlign: "center", padding: "20px" }}>No orders found.</div>;
    }

    return (
        <div className='container-fluid p-0'>
        <div><BarNav /></div> 
            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        fontSize: "28px",
                        color: "#333",
                    }}
                >
                    Your Orders
                </h2>
                {orders.map((order) => (
                    <div
                        key={order.orderId}
                        style={{
                            marginBottom: "20px",
                            padding: "20px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        <div style={{ marginBottom: "15px", textAlign: "left" }}>
                            <h3 style={{ fontSize: "22px", color: "#555" }}>Order Summary</h3>
                            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                        </div>

                        <div
                            style={{
                                marginBottom: "20px",
                                padding: "15px",
                                borderRadius: "8px",
                                backgroundColor: "#e6f7ff",
                                textAlign: "left",
                            }}
                        >
                            <h4 style={{ fontSize: "20px", color: "#007bff" }}>Shipping Address</h4>
                            <p>
                                {order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                                {order.shippingAddress.country} - {order.shippingAddress.zipcode}
                            </p>
                            <p><strong>Mobile Number:</strong> {order.shippingAddress.mobileNumber}</p>
                        </div>

                        <div
                            style={{
                                marginBottom: "20px",
                                padding: "15px",
                                borderRadius: "8px",
                                backgroundColor: "#fff7e6",
                                textAlign: "left",
                            }}
                        >
                            <h4 style={{ fontSize: "20px", color: "#ff9900" }}>Order Items</h4>
                            <ul style={{ paddingLeft: "20px" }}>
                                {order.orderItems.map((item, index) => (
                                    <li key={index} style={{ marginBottom: "10px" }}>
                                        <p>
                                            <strong>Name:</strong> {item.productName}<br />
                                            <strong>Quantity:</strong> {item.quantity}<br />
                                            <strong>Price:</strong> ₹{item.price}<br />
                                            <strong>Status:</strong> {item.status}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div
                            style={{
                                marginBottom: "20px",
                                padding: "15px",
                                borderRadius: "8px",
                                backgroundColor: "#e6ffe6",
                                textAlign: "left",
                            }}
                        >
                            <h4 style={{ fontSize: "20px", color: "#28a745" }}>Payment Details</h4>
                            <p><strong>Payment Method:</strong> {order.paymentDetails.paymentMethod}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrdersPage;

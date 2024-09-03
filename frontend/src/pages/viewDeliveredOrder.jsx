import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import { getOrdersByStatus} from '../services/products';

function ViewDeliveredOrder() {
    const { sellerId } = useParams(); // Fetch seller ID from URI parameters
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const deliveredOrders = await getOrdersByStatus(sellerId, 'DELIVERED');
                setOrders(deliveredOrders);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [sellerId]);

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
                }}>Delivered Orders</h2>
                <div style={{ textAlign: 'center' }}>
                    {loading ? (
                        <p style={{
                            fontSize: '1.2em',
                            color: '#00796b'
                        }}>Loading...</p>
                    ) : error ? (
                        <p style={{
                            fontSize: '1.2em',
                            color: '#f44336'
                        }}>Error: {error}</p>
                    ) : orders.length === 0 ? (
                        <p style={{
                            fontSize: '1.2em',
                            color: '#9e9e9e'
                        }}>No Delivered orders found.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{
                                width: '100%',
                                marginBottom: '20px',
                                backgroundColor: '#ffffff',
                                borderCollapse: 'collapse'
                            }}>
                                <thead>
                                    <tr style={{ border: '1px solid #dddddd' }}>
                                        <th style={{
                                            border: '1px solid #dddddd',
                                            padding: '10px',
                                            textAlign: 'center'
                                        }}>Order ID</th>
                                        <th style={{
                                            border: '1px solid #dddddd',
                                            padding: '10px',
                                            textAlign: 'center'
                                        }}>Order Date</th>
                                        <th style={{
                                            border: '1px solid #dddddd',
                                            padding: '10px',
                                            textAlign: 'center'
                                        }}>Amount</th>
                                        <th style={{
                                            border: '1px solid #dddddd',
                                            padding: '10px',
                                            textAlign: 'center'
                                        }}>Shipping Address</th>
                                        <th style={{
                                            border: '1px solid #dddddd',
                                            padding: '10px',
                                            textAlign: 'center'
                                        }}>Payment Method</th>
                                        <th style={{
                                            border: '1px solid #dddddd',
                                            padding: '10px',
                                            textAlign: 'center'
                                        }}>Status</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.orderId}>
                                            <td style={{
                                                border: '1px solid #dddddd',
                                                padding: '10px',
                                                textAlign: 'center'
                                            }}>{order.orderId}</td>
                                            <td style={{
                                                border: '1px solid #dddddd',
                                                padding: '10px',
                                                textAlign: 'center'
                                            }}>{order.orderDate}</td>
                                            <td style={{
                                                border: '1px solid #dddddd',
                                                padding: '10px',
                                                textAlign: 'center'
                                            }}>{order.orderItem.price}</td>
                                            <td style={{
                                                border: '1px solid #dddddd',
                                                padding: '10px',
                                                textAlign: 'center'
                                            }}>
                                                <div>
                                                    <p>{order.shippingAddress.addressLine1},
                                                        {order.shippingAddress.addressLine2},
                                                        {order.shippingAddress.city}, {order.shippingAddress.state},
                                                        {order.shippingAddress.country} - {order.shippingAddress.zipcode},
                                                        Mobile: {order.shippingAddress.mobileNumber}</p>
                                                </div>
                                            </td>
                                            <td style={{
                                                border: '1px solid #dddddd',
                                                padding: '10px',
                                                textAlign: 'center'
                                            }}>{order.paymentMethod}</td>
                                            <td style={{
                                                border: '1px solid #dddddd',
                                                padding: '10px',
                                                textAlign: 'center'
                                            }}>{order.orderItem.status}</td>
                                           </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
        </div>
    );
}

export default ViewDeliveredOrder;

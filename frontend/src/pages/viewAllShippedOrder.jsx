import React, { useState, useEffect } from "react";
import { getAllOrdersByStatus ,updateShippedOrderStatus} from "../services/products";
import Navbar from '../components/Navbar';


function ViewAllShippedOrder() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const [status, setStatus] = useState('shipped'); // Default status
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getAllOrdersByStatus(page, pageSize, status);
        setOrders(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, pageSize, status]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleDeliverClick = async (orderId) => {
    try {
      await updateShippedOrderStatus(orderId, 'DELIVERED'); // Update order status
      // Refresh the orders list
      const updatedOrders = await getAllOrdersByStatus(page, pageSize, 'SHIPPED');
      setOrders(updatedOrders.content);
      setTotalPages(updatedOrders.totalPages);
    } catch (error) {
      setError("Error updating order status: " + error.message);
    }
  };


  return (

    <div style={{ textAlign: "center", padding: "50px 0" }}>
    <Navbar />
    <div style={{ fontFamily: "'Roboto', sans-serif", padding: "20px", maxWidth: "1000px", margin: "20px auto", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#00796b", textAlign: "center" }}>
        Orders - {status.charAt(0).toUpperCase() + status.slice(1)}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", marginBottom: "20px", backgroundColor: "#ffffff", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>Order ID</th>
                  <th style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>Order Date</th>
                  <th style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>Amount</th>
                  <th style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>Shipping Address</th>
                  <th style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>Payment Method</th>
                  <th style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>Status</th>
                  <th style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>Action</th>

                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>{order.orderId}</td>
                    <td style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>{order.orderDate}</td>
                    <td style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>{order.orderItem.price}</td>
                    <td style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>
                      <div>
                        <p>
                          {order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.zipcode},
                          Mobile: {order.shippingAddress.mobileNumber}
                        </p>
                      </div>
                    </td>
                    <td style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>{order.paymentMethod}</td>
                    <td style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>{order.orderItem.status}</td>
                    <td style={{ border: "1px solid #dddddd", padding: "10px", textAlign: "center" }}>
                      <button
                          className="btn btn-warning"
                          onClick={() => handleDeliverClick(order.orderId)}
                        >
                          Deliver
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button style={{ margin: "0 5px", padding: "5px 10px", fontSize: "16px" }} disabled={page <= 0} onClick={() => handlePageChange(page - 1)}>
              Previous
            </button>
            <span style={{ margin: "0 5px", padding: "5px 10px", fontSize: "16px" }}>
              Page {page + 1} of {totalPages}
            </span>
            <button style={{ margin: "0 5px", padding: "5px 10px", fontSize: "16px" }} disabled={page >= totalPages - 1} onClick={() => handlePageChange(page + 1)}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default ViewAllShippedOrder;

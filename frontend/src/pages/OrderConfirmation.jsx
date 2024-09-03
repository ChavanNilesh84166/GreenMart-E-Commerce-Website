import React from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function OrderConfirmation() {
  const location = useLocation();
  const { orderDetails } = location.state || {}; // Retrieve order details from state

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Order placed successfully!</p>
      <p>Your order will be delivered soon.</p>
      
      <Link to="/Home">
        <button>Go to Home Page</button>
      </Link>
    </div>
  );
}

export default OrderConfirmation;

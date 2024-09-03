import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../config";

function PlaceOrder() {
  const location = useLocation();
  const { cartItems, totalAmount } = location.state;
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    mobileNumber: ""
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      const customerId = sessionStorage.getItem("customerid");
      try {
        const response = await axios.get(`${config.url}/users/getShippingAddress/${customerId}`);
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching shipping addresses:", error);
        toast.error("Failed to fetch shipping addresses");
      }
    };

    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddressSelection = (e) => {
    setSelectedAddressId(e.target.value);
  };

  const handlePlaceOrder = async () => {
    const customerId = sessionStorage.getItem("customerid");

    // Prepare order data
    const orderData = {
      orderDate: new Date().toISOString().split('T')[0],
      totalAmount: totalAmount,
      shippingAddress: isAddingNewAddress
        ? {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            country: address.country,
            mobileNumber: address.mobileNumber,
            zipcode: address.zipCode,
          }
        : addresses.find(addr => addr.shippingId === parseInt(selectedAddressId)),
      orderItems: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        sellerId: item.sellerId, // Include sellerId from cartItems
        status: "PENDING", // Set status for each order item
      })),
      paymentDetails: {
        amount: totalAmount,
        paymentMethod: "COD", // Example payment method
      }
    };

    try {
      const response = await axios.post(
        `${config.url}/orders/placeOrder/${customerId}`,
        orderData
      );
      toast.success("Order placed successfully");
      navigate("/order-confirmation", {
        state: { orderDetails: response.data },
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div>
      <h2>Place Your Order</h2>
      {cartItems.length > 0 ? (
        <div>
          <div>
            {cartItems.map((item) => (
              <div key={item.productId} className="order-item">
                <br />
                <h4>{item.productName}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
                <p>
                  Total amount to pay:{" "}
                  {(item.price * item.quantity).toFixed(2)}
                </p>
                <hr />
              </div>
            ))}
          </div>

          <div>
            <label>
              <input
                type="radio"
                value="existing"
                checked={!isAddingNewAddress}
                onChange={() => setIsAddingNewAddress(false)}
              />
              Choose an existing address
            </label>
            <label>
              <input
                type="radio"
                value="new"
                checked={isAddingNewAddress}
                onChange={() => setIsAddingNewAddress(true)}
              />
              Add a new address
            </label>
          </div>

          {!isAddingNewAddress && addresses.length > 0 ? (
            <div>
              <label>Select an existing address:</label>
              <select value={selectedAddressId} onChange={handleAddressSelection}>
                <option value="">Choose address</option>
                {addresses.map((addr) => (
                  <option key={addr.shippingId} value={addr.shippingId}>
                    {addr.addressLine1}, {addr.addressLine2}, {addr.city}, {addr.state}, {addr.zipcode}, {addr.mobileNumber}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <h3>Enter Shipping Address</h3>
              <div>
                <label>Address Line 1:</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={address.addressLine1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Address Line 2:</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={address.addressLine2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>State:</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Country:</label>
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Zip Code:</label>
                <input
                  type="text"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Mobile Number:</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={address.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default PlaceOrder;

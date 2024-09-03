import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BarNav from '../components/BarNav';
import config from "../config";

function CustomerProfile() {
  const [user, setUser] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const navigate = useNavigate();
  const customerId = sessionStorage.getItem("customerid");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${config.url}/users/getUserProfile/${customerId}`
        );
        setUser(response.data);
        if (response.data.shippingDetail) {
          setAddress(response.data.shippingDetail);
        } else {
          setShowAddressForm(true);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (customerId) {
      fetchUserDetails();
    } else {
      navigate("/login");
    }
  }, [customerId, navigate]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${config.url}/users/addShippingAddress/${customerId}`,
        address
      );
      setShowAddressForm(false);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleViewOrders = () => {
    navigate(`/orders/${customerId}`);
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", fontSize: "20px", color: "#555" }}>
        Loading...
      </div>
    );
  }

  return (
    <div className='container-fluid p-0'>
    <div><BarNav /></div> 
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        Customer Profile
      </h2>
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Mobile Number:</strong> {user.mobileNumber}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
        </p>
      </div>

      {user.shippingDetail ? (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "8px",
          }}
        >
          <h3>Address</h3>
          <p>
            <strong>Address Line 1:</strong> {user.shippingDetail.addressLine1}
          </p>
          <p>
            <strong>Address Line 2:</strong> {user.shippingDetail.addressLine2}
          </p>
          <p>
            <strong>City:</strong> {user.shippingDetail.city}
          </p>
          <p>
            <strong>State:</strong> {user.shippingDetail.state}
          </p>
          <p>
            <strong>Country:</strong> {user.shippingDetail.country}
          </p>
          <p>
            <strong>Zip Code:</strong> {user.shippingDetail.zipcode}
          </p>
          <button
            onClick={handleViewOrders}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              display: "block",
              width: "100%",
              textAlign: "center",
            }}
          >
            View Orders
          </button>
        </div>
      ) : (
        showAddressForm && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#fff3e0",
              borderRadius: "8px",
            }}
          >
            <h3>Add Address</h3>
            <form onSubmit={handleAddressSubmit} style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Address Line 1:
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={address.addressLine1}
                  onChange={handleAddressChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Address Line 2:
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={address.addressLine2}
                  onChange={handleAddressChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  City:
                </label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  State:
                </label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Country:
                </label>
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleAddressChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Zip Code:
                </label>
                <input
                  type="text"
                  name="zipcode"
                  value={address.zipcode}
                  onChange={handleAddressChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ff9800",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add Address
              </button>
            </form>
          </div>
        )
      )}
    </div>
    </div>
  );
}

export default CustomerProfile;

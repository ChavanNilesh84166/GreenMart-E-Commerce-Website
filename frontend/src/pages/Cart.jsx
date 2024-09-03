import React, { useEffect, useState } from "react";
import { getCartProducts } from "../services/products";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BarNav from "../components/BarNav";
import config from "../config";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const customerId = sessionStorage.getItem("customerid");
  const navigate = useNavigate();

  const loadCartProducts = async (customerId) => {
    try {
      const products = await getCartProducts(customerId);
      const productsWithQuantityAndDiscount = products.map((product) => ({
        ...product,
        quantity: 1,
        discount: product.discount || 0,
      }));
      setCartItems(productsWithQuantityAndDiscount);
    } catch (error) {
      console.error("Failed to fetch cart products:", error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: parseInt(newQuantity, 10) }
          : item
      )
    );
  };

  const handleRemoveProduct = async (userId, productId) => {
    try {
      await axios.delete(`${config.url}/cart/remove/${userId}/${productId}`);
      toast.success("Product removed from cart");
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      toast.error("Failed to remove product from cart");
      console.error("Error during product removal:", error);
    }
  };

  const handlePlaceOrder = () => {
    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    navigate("/place-order", { state: { cartItems, totalAmount } });
  };

  useEffect(() => {
    if (customerId) {
      loadCartProducts(customerId);
    } else {
      console.error("No customer ID found in session storage");
    }
  }, [customerId]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <BarNav />
      <div style={{ marginTop: '50px' }}>
        <h2 style={{ color: '#4CAF50' }}>Your Cart</h2>
        {cartItems.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {cartItems.map((item) => (
              <div
                key={item.productId}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '15px',
                  width: '80%',
                  textAlign: 'left',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3 style={{ marginBottom: '10px', color: '#333' }}>{item.brandName}</h3>
                <h3 style={{ marginBottom: '10px', color: '#333' }}>{item.name}</h3>
                <img
                  style={{ height: '100px', width: '100px', borderRadius: '10px' }}
                  src={item.imageUrl}
                  alt={item.name}
                />
                <div style={{ margin: '10px 0', color: '#777' }}>
                  <p style={{ margin: '10px 0', color: '#777' }}>Quantity:</p>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      width: '60px',
                      textAlign: 'center',
                    }}
                  />
                </div>
                <p style={{ margin: '10px 0', color: '#777' }}>Price: {item.price}</p>
                <p style={{ margin: '10px 0', color: '#777' }}>Stock: {item.stock}</p>
                <button
                  onClick={() => handleRemoveProduct(customerId, item.productId)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  Remove
                </button>
                <hr />
              </div>
            ))}
            <button
              onClick={handlePlaceOrder}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              Place Order
            </button>
          </div>
        ) : (
          <p style={{ color: '#777' }}>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;

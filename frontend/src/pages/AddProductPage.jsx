import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addProduct, getCategories } from "../services/products";
import { toast } from "react-toastify";
import Modal from "react-modal"; // Import modal library
import Navbar from '../components/Navbar';
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

// Set the app element for the modal
Modal.setAppElement('#root');

const AddProductPage = () => {
  const { sellerId } = useParams();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const onCancel = () => {
    navigate('/sellerDashboard');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("categoryId", categoryId);
    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    try {
      const response = await addProduct(formData, sellerId);
      console.log("Product added successfully:", response);
      toast.success("Product added successfully!");
      setIsModalOpen(true);

      // Reset form fields
      setProductName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategoryId("");
      setImageUrl(null);

    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
    <Navbar />
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ padding: '20px', margin: '20px auto', maxWidth: '800px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ marginBottom: '20px', color: '#00796b' }}>Add New Product</h2>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor='productName' style={{ fontWeight: 'bold', color: '#00796b' }}>Product Name</label>
              <input
                type='text'
                id='productName'
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor='description' style={{ fontWeight: 'bold', color: '#00796b' }}>Description</label>
              <textarea
                id='description'
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor='price' style={{ fontWeight: 'bold', color: '#00796b' }}>Price</label>
              <input
                type='number'
                id='price'
                step="0.01"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor='stock' style={{ fontWeight: 'bold', color: '#00796b' }}>Stock</label>
              <input
                type='number'
                id='stock'
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor='categoryId' style={{ fontWeight: 'bold', color: '#00796b' }}>Category</label>
              <select
                id='categoryId'
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                value={categoryId}
                onChange={handleCategoryChange}
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor='image' style={{ fontWeight: 'bold', color: '#00796b' }}>Image</label>
              <input
                type='file'
                id='image'
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                onChange={handleFileChange}
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <button type="submit" style={{ backgroundColor: '#00796b', borderColor: '#00796b', color: '#fff', padding: '10px 20px', borderRadius: '4px', marginRight: '10px' }}>
                Add Product
              </button>
              <button onClick={onCancel} type="button" style={{ backgroundColor: '#f44336', borderColor: '#f44336', color: '#fff', padding: '10px 20px', borderRadius: '4px' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Added"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Product Added Successfully!</h2>
        <button onClick={closeModal} style={{ backgroundColor: '#00796b', borderColor: '#00796b', color: '#fff', padding: '10px 20px', borderRadius: '4px' }}>Close</button>
      </Modal>
    </div>
    </div>
  );
};

export default AddProductPage;

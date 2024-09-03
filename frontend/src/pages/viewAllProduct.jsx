import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../services/products";
import Navbar from '../components/Navbar';


function ViewAllProduct() {
    const userId = sessionStorage.getItem("customerid"); // Example adminId, replace with dynamic value if needed
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleUpdateClick = (product) => {
        navigate(`/updateAdminProduct/${product.productId}/${userId}`, { state: { product } });
    };

    const handleDeleteClick = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(products.filter((product) => product.productId !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };


    return (

        <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Navbar />
            <div style={styles.viewProduct}>
                <main style={styles.mainContent}>
                    <h2 style={styles.pageTitle}>Product List</h2>
                    <div style={styles.container}>
                        <div style={styles.tableResponsive}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.tableHeader}>Product Name</th>
                                        <th style={styles.tableHeader}>Description</th>
                                        <th style={styles.tableHeader}>Stock</th>
                                        <th style={styles.tableHeader}>Image</th>
                                        <th style={styles.tableHeader}>Price</th>
                                        <th style={styles.tableHeader}>Category Name</th>
                                        <th style={styles.tableHeader} colSpan={2}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.productId}>
                                            <td style={styles.tableCell}>{product.productName}</td>
                                            <td style={styles.tableCell}>{product.description}</td>
                                            <td style={styles.tableCell}>{product.stock}</td>
                                            <td style={styles.tableCell}>
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.productName}
                                                    style={styles.productImage}
                                                />
                                            </td>
                                            <td style={styles.tableCell}>{product.price}</td>
                                            <td style={styles.tableCell}>{product.categoryName}</td>
                                            <td style={{
                                                border: '1px solid #dddddd',
                                                padding: '10px',
                                                textAlign: 'center'
                                            }}>
                                                <button
                                                    style={{
                                                        backgroundColor: '#ffc107',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        padding: '5px 10px',
                                                        borderRadius: '4px',
                                                        textDecoration: 'none'
                                                    }}
                                                    onClick={() => handleUpdateClick(product)}
                                                >
                                                    Update
                                                </button>
                                            </td>
                                            <td style={{
                                                border: '1px solid #dddddd',
                                                padding: '10px',
                                                textAlign: 'center'
                                            }}>
                                                <button
                                                    style={{
                                                        backgroundColor: '#dc3545',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        padding: '5px 10px',
                                                        borderRadius: '4px'
                                                    }}
                                                    onClick={() => handleDeleteClick(product.productId)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ViewAllProduct;

// Inline CSS styles
const styles = {
    viewProduct: {
        fontFamily: 'Roboto, sans-serif',
    },
    mainContent: {
        padding: '20px',
        margin: '20px auto',
        maxWidth: '1000px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    pageTitle: {
        marginBottom: '20px',
        color: '#00796b',
        textAlign: 'center',
    },
    container: {
        margin: '0 auto',
        maxWidth: '100%',
    },
    tableResponsive: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        marginBottom: '20px',
        backgroundColor: '#ffffff',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        border: '1px solid #dddddd',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableCell: {
        border: '1px solid #dddddd',
        padding: '10px',
        textAlign: 'center',
    },
    productImage: {
        width: '100px',
        height: 'auto',
    },
    btnWarning: {
        backgroundColor: '#ffc107',
        color: '#ffffff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    btnDanger: {
        backgroundColor: '#dc3545',
        color: '#ffffff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

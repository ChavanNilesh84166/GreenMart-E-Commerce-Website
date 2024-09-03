import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { getSellers } from "../services/products"; 
import { updateSellerStatus } from "../services/user";

function ViewSeller() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const data = await getSellers(); 
        setSellers(data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handleStatusChange = async (sellerId, isBlocked) => {
    try {
      await updateSellerStatus(sellerId, isBlocked);
      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller.sellerId === sellerId ? { ...seller, isBlocked } : seller
        )
      );
    } catch (error) {
      console.error("Error updating seller status:", error);
    }
  };

  return (
    
    <div style={{ textAlign: "center", padding: "50px 0" }}>
        <Navbar />
      <div style={styles.viewUser}>
        <main style={styles.mainContent}>
          <h2 style={styles.pageTitle}>Seller List</h2>
          <div style={styles.container}>
            <div style={styles.tableResponsive}>
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th>Seller Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Store Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>GSTIN</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {sellers.map((seller) => (
                    <tr key={seller.email} style={styles.tableRow}>
                      <td style={styles.td}>{seller.name}</td>
                      <td style={styles.td}>{seller.email}</td>
                      <td style={styles.td}>{seller.mobileNumber}</td>
                      <td style={styles.td}>{seller.storeName}</td>
                      <td style={styles.td}>{seller.address}</td>
                      <td style={styles.td}>{seller.phone}</td>
                      <td style={styles.td}>{seller.gstinNumber}</td>
                      <td style={styles.td}>
                        <button
                          style={seller.isBlocked ? styles.btnSuccess : styles.btnDanger}
                          onClick={() => handleStatusChange(seller.sellerId, !seller.isBlocked)}
                        >
                          {seller.isBlocked ? "Unblock" : "Block"}
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

export default ViewSeller;

// Inline CSS styles
const styles = {
  viewUser: {
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
  tableHead: {
    backgroundColor: '#00796b',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tableBody: {
    backgroundColor: '#ffffff',
  },
  tableRow: {
    borderBottom: '1px solid #dddddd',
  },
  td: {
    border: '1px solid #dddddd',
    padding: '10px',
    textAlign: 'center',
  },
  btnSuccess: {
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  btnDanger: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

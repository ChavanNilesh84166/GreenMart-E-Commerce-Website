import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import { getUsers } from "../services/products";
import { updateUserStatus } from "../services/user";

function ViewCustomer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); 
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, isBlocked) => {
    try {
      await updateUserStatus(userId, isBlocked);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, isBlocked } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
      <Navbar />
      <div style={styles.viewUser}>
        <main style={styles.mainContent}>
          <h2 style={styles.pageTitle}>User List</h2>
          <div style={styles.container}>
            <div style={styles.tableResponsive}>
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Mobile Number</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {users.map((user) => (
                    <tr key={user.email} style={styles.tableRow}>
                      <td style={styles.td}>{user.firstName}</td>
                      <td style={styles.td}>{user.lastName}</td>
                      <td style={styles.td}>{user.email}</td>
                      <td style={styles.td}>{user.dob}</td>
                      <td style={styles.td}>{user.mobileNumber}</td>
                      <td style={styles.td}>{user.isBlocked ? "Blocked" : "Active"}</td>
                      <td style={styles.td}>
                        <button
                          style={user.isBlocked ? styles.btnSuccess : styles.btnDanger}
                          onClick={() => handleStatusChange(user.userId, !user.isBlocked)}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
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

export default ViewCustomer;

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

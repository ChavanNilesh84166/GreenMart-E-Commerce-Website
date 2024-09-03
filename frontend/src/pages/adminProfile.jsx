import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAdminProfile } from '../services/user';

function ViewAdminProfile() {
  const { userId } = useParams(); // Fetch user ID from URI parameters
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const adminProfile = await getAdminProfile(userId);
        setProfile(adminProfile);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
    <Navbar />
    <div style={styles.viewProfile}>
      <main style={styles.profileContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={styles.errorMessage}>Error: {error}</p>
        ) : (
          <>
            <div style={styles.profileHeader}>
              <h3 style={styles.headerText}>Profile Details</h3>
            </div>
            <div style={styles.info}>
              <span style={styles.label}>Name:</span> {profile.name}
            </div>
            <div style={styles.info}>
              <span style={styles.label}>Mobile Number:</span> {profile.mobileNumber}
            </div>
            <div style={styles.info}>
              <span style={styles.label}>Email:</span> {profile.email}
            </div>
            <div style={styles.info}>
              <span style={styles.label}>Date of Birth:</span> {profile.dob}
            </div>
          </>
        )}
      </main>
    </div>
    </div>
  );
}

export default ViewAdminProfile;

// Inline CSS styles
const styles = {
  viewProfile: {
    fontFamily: 'Roboto, sans-serif',
  },
  profileContainer: {
    padding: '20px',
    margin: '20px auto',
    maxWidth: '800px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  profileHeader: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  headerText: {
    color: '#00796b',
  },
  info: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    color: '#00796b',
  },
  errorMessage: {
    color: '#c82333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

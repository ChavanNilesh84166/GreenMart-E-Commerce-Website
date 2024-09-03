import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getSellerProfile } from '../services/user'; // Import the updated service function

function SellerProfile() {
  const { sellerId } = useParams(); // Fetch seller ID from URI parameters
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const sellerProfile = await getSellerProfile(sellerId);
        setProfile(sellerProfile);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [sellerId]);

  return (

    <div style={{ textAlign: "center", padding: "50px 0" }}>
    <Navbar />
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      <main style={{
        padding: '20px',
        margin: '20px auto',
        maxWidth: '800px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : error ? (
          <p style={{
            color: '#c82333',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>Error: {error}</p>
        ) : (
          <>
            <div style={{
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#00796b' }}>Profile Details</h3>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{
                fontWeight: 'bold',
                color: '#00796b'
              }}>Name:</span> {profile.name}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{
                fontWeight: 'bold',
                color: '#00796b'
              }}>Mobile Number:</span> {profile.mobileNumber}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{
                fontWeight: 'bold',
                color: '#00796b'
              }}>Email:</span> {profile.email}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{
                fontWeight: 'bold',
                color: '#00796b'
              }}>Date of Birth:</span> {profile.dob}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{
                fontWeight: 'bold',
                color: '#00796b'
              }}>Store Name:</span> {profile.storeName}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{
                fontWeight: 'bold',
                color: '#00796b'
              }}>Address:</span> {profile.address}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{
                fontWeight: 'bold',
                color: '#00796b'
              }}>Phone:</span> {profile.phone}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{
                fontWeight: 'bold',
                color: '#00796b'
              }}>GSTIN Number:</span> {profile.gstinNumber}
            </div>
          </>
        )}
      </main>
    </div>
    </div>
  );
}

export default SellerProfile;

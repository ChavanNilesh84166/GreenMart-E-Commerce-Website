import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {

const navigate = useNavigate()
const onEdit = () => {
  navigate('/userprofileform')
}

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="rounded-circle mb-3"
              />
              <h4>SIDDHANT </h4>
              <p className="text-muted mb-1">Mobile: 9988556644</p>
              <p className="text-muted mb-1">Email: test@example.com</p>
              <p className="text-muted mb-1">Address: Hinjewadi, Pune</p>
              <p className="text-muted mb-1">Date of Birth: January 1, 2000</p>
              <button onClick={onEdit} className="btn btn-primary btn-sm">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
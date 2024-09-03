import React, { useState } from 'react';
//import './UserProfileForm.css'
import '../UserProfileForm.css'
const UserProfileForm = ({ saveProfile }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    profilePictureUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, profilePictureUrl: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile(profile);
    setProfile({ name: '', email: '', bio: '', profilePictureUrl: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Bio:</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Profile Picture:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      {profile.profilePictureUrl && (
        <div className="image-preview">
          <img src={profile.profilePictureUrl} alt="Profile Preview" className="profile-image-preview" />
        </div>
      )}
      <button type="submit" className="bttn">Save Profile</button>
    </form>
  );
};

export default UserProfileForm;
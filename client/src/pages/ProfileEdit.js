
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_USER_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';


const ProfileEdit = ({ user, updateUser }) => {
    const [formData, setFormData] = useState({
      username: user.username,
      email: user.email,
      bio: user.bio || '',
      
    });

    const [editUserProfile] = useMutation(EDIT_USER_PROFILE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(Auth.getProfile().data._id, "auth");
console.log(formData, "formData");
    try {
      console.log("hi");
      const { data } = await editUserProfile({
        variables: {
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
        
        },
      });
      console.log("success");
      setFormData({
        ...formData,
        username: data.editUserProfile.username,
        email: data.editUserProfile.email,
        bio: data.editUserProfile.bio,
      });
      updateUser(data.editUserProfile);
    } catch (error) {
     
    }
  };

  return (
    <div>
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        {/* form sections for editing profile */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
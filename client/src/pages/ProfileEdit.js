
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa'
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
    <div className='edit-profile'>
      <h3><FaIcons.FaPen /> Edit Profile</h3>
      <form onSubmit={handleSubmit} >
        {/* form sections for editing profile */}
        <div className="form-group m-2">
          <label htmlFor="username "  className='m-1'>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className='m-1'
          />
        </div>
        <div className="form-group m-2">
          <label htmlFor="email"  className='m-1'>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='m-1'
          />
        </div>
        <div className="form-group m-2 flex-column">
          <label htmlFor="bio"  className='m-1'>Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className='m-1'
          />
        </div>
        

        <button type="submit" className="btn-comment btn-narrow  m-1">Save Changes</button>

      </form>
    </div>
  );
};

export default ProfileEdit;
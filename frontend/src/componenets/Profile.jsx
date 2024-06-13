import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import home from '../assets/home.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation, useUpdateUserProfileMutation } from '../../slices/usersApiSlice';
import { logout, setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Profile = () => {
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const [updateUserProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      setName(userInfo.name || '');
      setEmail(userInfo.email || '');
      setImage(userInfo.image || '');
      
    }
  }, [userInfo]);

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
      toast.error('Error logging out. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('_id', userInfo._id);
      formData.append('name', name);
      formData.append('email', email);
      if (image) formData.append('image', image);

      const res = await updateUserProfile(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  return (
    <section
      className="bg-neutral-200 dark:bg-neutral-700"
      style={{
        backgroundImage: `url(${home})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '130vh',
      }}
    >
      <header className="flex justify-between items-center py-4 px-8 bg-black bg-opacity-50">
        <div className="flex items-center">
          <p className="text-lg font-bold text-gray-900">God in You</p>
        </div>
        <div>
          <Link
            to="/profile"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md mr-4"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-md"
          >
            Log Out
          </button>
        </div>
      </header>

      <main>
        <section className="py-12" style={{ marginLeft: '600px' }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hi {name}</h1>
          <div>
            {imagePreview ? (
        <img
          src={imagePreview}
          alt="Profile Preview"
          className="mt-2 w-32 h-32 rounded-full border"
        />
      ) : userInfo && userInfo.image ? (
        <div>
          <p>Profile Image:</p>
          <img
            src={`/uploads/${userInfo.image}`}
            alt="Profile Image"
            className="mt-2 w-32 h-32 rounded-full border"
          />
        </div>
      ) : null}
            </div>
        </section>
        <section className="py-12" style={{ marginLeft: '600px' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Profile</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4" encType="multipart/form-data">
           
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleImageChange}
                accept="image/*"
              />
             
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </section>
      </main>

      <footer className="text-center py-8 text-gray-500">
        &copy; 2024 My App. All rights reserved.
      </footer>
    </section>
  );
};

export default Profile;

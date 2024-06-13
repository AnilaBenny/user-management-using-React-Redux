import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import home from '../assets/home.jpg';
import { useDispatch,useSelector } from 'react-redux';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [logoutApiCall]=useLogoutMutation();
  const navigate=useNavigate()
  const handleLogout = async() => {
    try{
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate('/')
    }
    catch(err){
        console.log(err);
    }
    
  };

  return (
    <section
      className="bg-neutral-200 dark:bg-neutral-700"
      style={{
        backgroundImage: `url(${home})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh'
      }}
    >
      <header className="flex justify-between items-center py-4 px-8 bg-black bg-opacity-50">
        <div className="flex items-center">
          <p className="text-lg font-bold text-gray-900">God in You</p>
        </div>
        <div>
          <Link to="/profile" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md mr-4">
            Profile
          </Link>
          <button onClick={handleLogout} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-md">
            Log Out
          </button>
        </div>
      </header>

      <main>
        <section className="py-12" style={{ marginLeft: '600px' }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Website!</h1>
          <p className="text-lg text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </section>
      </main>
      
      <footer className="text-center py-8 text-gray-500">&copy; 2024 My App. All rights reserved.</footer>
    </section>
  );
}

export default Home;

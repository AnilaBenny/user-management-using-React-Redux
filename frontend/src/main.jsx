import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from '../src/componenets/Login.jsx';
import Layout from '../Layout.jsx';
import Register from '../src/componenets/Register.jsx';
import Home from './componenets/Home.jsx';
import store from '../store.js';
import { Provider } from 'react-redux';
import './index.css';
import PrivateRoute from './componenets/PrivateRoute.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Profile from './componenets/Profile.jsx';
import AdminLogin from './componenets/AdminLogin.jsx';
import AdminHome from './componenets/AdminHome.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/home' element={<PrivateRoute />}>
      <Route path='/home' element={<Home/>} />
      </Route>
      <Route path='/profile' element={<Profile/>} />
      <Route path='/admin' element={<AdminLogin/>}/>
      <Route path='/adminhome' element={<PrivateRoute />}>
      <Route path='/adminhome' element={<AdminHome/>}/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
);

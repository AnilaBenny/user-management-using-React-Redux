import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from '../assets/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/home'); 
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log('s');
            dispatch(setCredentials({ ...res }));
            
            navigate('/home'); 
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred.");
        }
    }

    return (
        <section
            className="bg-neutral-200 dark:bg-neutral-700"
            style={{
                backgroundImage: `url(${logo})`,
                backgroundSize: 'cover',
                width: '100vw',
                height: '100vh'
            }}
        >
            <div className="container h-full p-10">
                <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full max-w-md">
                        <div
                            className="block rounded-lg dark:bg-neutral-800 p-8"
                            style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)' }}
                        >
                            <div className="text-center">
                                <h1 className="mb-4 mt-1 text-5xl font-bold" id="profile">
                                    Login
                                </h1>
                            </div>
                            <form className="space-y-4" onSubmit={submitHandler}>
                                <p>Please log in to your account</p>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-orange-400 to-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Log in
                                </button>
                            </form>
                            <div className="mt-4 text-center">
                                <p>Don't have an account?</p>
                                <Link to="/register">
                                    <button className="w-full bg-gradient-to-r from-pink-600 to-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Register
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;

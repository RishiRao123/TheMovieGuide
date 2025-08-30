import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/v1/auth/login";
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setError(null);
        toast.success("Login Successful");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        toast.error(error).response.data.message;
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='relative min-h-screen bg-black bg-cover bg-center flex items-center justify-center'>
      {/* Background image placeholder */}
      <div className='absolute inset-0 bg-black/60' />

      {/* Login Card */}
      <div className='relative z-10 bg-neutral-900/90 p-8 rounded-xl w-full max-w-md shadow-lg'>
        {/* Icon */}
        <div className='flex justify-center mb-6'>
          <div className='bg-yellow-400 p-3 rounded-full'>
            <span className='text-black font-bold text-2xl'>🎬</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className='text-2xl font-bold text-center text-yellow-400 mb-2'>
          Welcome Back
        </h2>
        <p className='text-gray-400 text-center mb-6'>
          Sign in to your TheMovieGuide account
        </p>

        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm text-gray-300 mb-1'>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-2 rounded-lg bg-neutral-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='block text-sm text-gray-300 mb-1'>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              className='w-full px-4 py-2 rounded-lg bg-neutral-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type='submit'
            className='w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition'
          >
            Log In
          </button>
        </form>

        <p className='text-center text-gray-400 mt-4 text-sm'>
          Don’t have an account?{" "}
          <Link to='/register' className='text-yellow-400 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      setErrors("Passwords do not match");
      return;
    }

    try {
      const url = "http://localhost:8000/api/v1/auth/signup";
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        navigate("/login");
      }
    } catch (errors) {
      setErrors(errors.response?.data?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='relative min-h-screen bg-black bg-cover bg-center flex items-center justify-center'>
      {/* Background image placeholder */}
      <div className='absolute inset-0 bg-black/60' />

      {/* Signup Card */}
      <div className='relative z-10 bg-neutral-900/90 p-8 rounded-xl w-full max-w-md shadow-lg'>
        {/* Icon */}
        <div className='flex justify-center mb-6'>
          <div className='bg-yellow-400 p-3 rounded-full'>
            <span className='text-black font-bold text-2xl'>🎬</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className='text-2xl font-bold text-center text-yellow-400 mb-2'>
          Join TheMovieGuide
        </h2>
        <p className='text-gray-400 text-center mb-6'>
          Create your account to start discovering amazing content
        </p>
        {errors && <p className='text-red-500 text-sm mb-4'>{errors}</p>}

        {/* Form */}
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm text-gray-300 mb-1'>Username</label>
            <input
              type='text'
              placeholder='Choose a username'
              className='w-full px-4 py-2 rounded-lg bg-neutral-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='block text-sm text-gray-300 mb-1'>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-2 rounded-lg bg-neutral-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className='block text-sm text-gray-300 mb-1'>Password</label>
            <input
              type='password'
              placeholder='Create a password'
              className='w-full px-4 py-2 rounded-lg bg-neutral-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className='block text-sm text-gray-300 mb-1'>
              Confirm Password
            </label>
            <input
              type='password'
              placeholder='Confirm your password'
              className='w-full px-4 py-2 rounded-lg bg-neutral-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              name='confirmpassword'
              value={formData.confirmpassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className='w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition'
            type='submit'
          >
            Create Account
          </button>
        </form>

        <p className='text-center text-gray-400 mt-4 text-sm'>
          Already have an account?{" "}
          <Link to='/login' className='text-yellow-400 hover:underline'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

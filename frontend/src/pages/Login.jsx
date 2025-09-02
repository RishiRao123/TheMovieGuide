import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../utils/toast.js";
import axios from "axios";
import { Film, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    try {
      const url = `${BackendUrl}/api/v1/auth/login`;
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        showSuccessToast("Login Successful");
        setTimeout(() => navigate("/"), 1000);
      } else {
        showErrorToast("Something went wrong");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong, please try again.";
      showErrorToast(message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className='relative min-h-screen bg-cover bg-center flex items-center justify-center'>
      {/* Login Card */}
      <div className='relative z-10 bg-neutral-900/90 p-8 rounded-xl w-full max-w-md shadow-lg'>
        {/* Logo */}
        <div className='flex flex-col items-center justify-center mb-6'>
          <div className='bg-yellow-500 p-4 rounded-lg flex items-center justify-center'>
            <Film className='w-8 h-8 text-black' />
          </div>
        </div>

        {/* Heading */}
        <h2 className='text-2xl font-bold text-center text-yellow-400 mb-2'>
          Welcome Back
        </h2>
        <p className='text-gray-400 text-center mb-6'>
          Sign in to your TheMovieGuide account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email */}
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
            {errors.email && (
              <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm text-gray-300 mb-1'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Enter your password'
                className='w-full px-4 py-2 rounded-lg bg-neutral-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400'
              >
                {showPassword ? (
                  <EyeOff className='w-5 h-5' />
                ) : (
                  <Eye className='w-5 h-5' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full mt-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition'
          >
            Log In
          </button>
        </form>

        {/* Footer */}
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

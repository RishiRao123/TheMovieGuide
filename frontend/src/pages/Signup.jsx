import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Film, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmpassword) {
      newErrors.confirmpassword = "Confirm your password";
    } else if (formData.confirmpassword !== formData.password) {
      newErrors.confirmpassword = "Passwords do not match";
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

    setLoading(true);

    try {
      const response = await axios.post(
        `${BackendUrl}/api/v1/auth/signup`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach((err) => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);

        error.response.data.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className='relative min-h-screen bg-cover bg-center flex items-center justify-center'>
      <div className='relative z-10 bg-neutral-900/90 p-8 rounded-xl w-full max-w-md shadow-lg'>
        {/* Logo */}
        <div className='flex flex-col items-center justify-center mb-4'>
          <div className='bg-yellow-500 p-4 rounded-lg flex items-center justify-center'>
            <Film className='w-8 h-8 text-black' />
          </div>
        </div>

        {/* Heading */}
        <h2 className='text-2xl font-bold text-center text-yellow-400 mb-2'>
          Join TheMovieGuide
        </h2>
        <p className='text-gray-400 text-center mb-6'>
          Create your account to start discovering amazing content
        </p>

        {/* Form */}
        <form className='space-y-4' onSubmit={handleSubmit}>
          {/* Username */}
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
            {errors.username && (
              <p className='text-red-500 text-xs mt-1'>{errors.username}</p>
            )}
          </div>

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
                placeholder='Create a password'
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

          {/* Confirm Password */}
          <div>
            <label className='block text-sm text-gray-300 mb-1'>
              Confirm Password
            </label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirm your password'
                className='w-full px-4 py-2 rounded-lg bg-neutral-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10'
                name='confirmpassword'
                value={formData.confirmpassword}
                onChange={handleChange}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400'
              >
                {showConfirmPassword ? (
                  <EyeOff className='w-5 h-5' />
                ) : (
                  <Eye className='w-5 h-5' />
                )}
              </button>
            </div>
            {errors.confirmpassword && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.confirmpassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            className='w-full mt-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
            type='submit'
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
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

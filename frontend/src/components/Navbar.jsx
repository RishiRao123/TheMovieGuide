import React, { useState } from "react";
import { Film, Menu, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleNavigate = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV Shows", path: "/tvshows" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Favorites", path: "/favorites" },
  ];

  return (
    <nav className='sticky top-0 z-50 bg-[#101011]/80 backdrop-blur-md border-b border-neutral-800'>
      <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo */}
          <a href='/' className='flex items-center space-x-3'>
            <div className='bg-yellow-500 p-2 rounded-md'>
              <div className='w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center'>
                <Film className='w-5 h-5 text-black' />
              </div>
            </div>
            <span className='text-2xl font-bold text-yellow-500'>
              TheMovieGuide
            </span>
          </a>

          {/* Main Navigation Links */}
          <div className='hidden md:flex items-center space-x-4'>
            {mainLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigate(link.path)}
                className={`relative text-lg font-medium px-2 py-1 transition-colors ${
                  activeLink === link.path
                    ? "text-yellow-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-yellow-500"
                    : "text-gray-400 hover:text-yellow-500"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right-side Links: Search + Login */}
          <div className='flex items-center space-x-4'>
            {/* Search Link with Icon */}
            <button
              onClick={() => handleNavigate("/search")}
              className={`flex items-center gap-1 px-3 py-1 text-yellow-500 font-medium rounded-md bg-yellow-500/10 backdrop-blur-sm hover:bg-yellow-500/20 transition relative`}
            >
              <Search className='w-4 h-4' />
              <span className='text-lg'>Search</span>
              <span className='absolute inset-0 bg-gradient-to-r from-yellow-400/40 via-yellow-500/20 to-yellow-400/40 opacity-0 hover:opacity-100 rounded-md transition-opacity'></span>
            </button>

            {/* Login Button */}
            <button
              onClick={() => navigate("/login")}
              className='bg-yellow-500 text-black px-4 py-2 rounded-sm font-medium hover:bg-yellow-400 active:bg-primary transition-colors'
            >
              Login
            </button>

            {/* Mobile Menu */}
            <button className='md:hidden border rounded-md p-2 hover:bg-neutral-800'>
              <Menu className='h-6 w-6 text-white' />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

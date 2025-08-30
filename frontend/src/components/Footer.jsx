import React from "react";
import { Film } from "lucide-react";

const footerLinks = [
  {
    title: "Browse",
    links: [
      { name: "Popular Movies", href: "/movies" },
      { name: "TV Shows", href: "/tv" },
      { name: "Search", href: "/search" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Sign Up", href: "/register" },
      { name: "Login", href: "/login" },
      { name: "My Watchlist", href: "/watchlist" },
      { name: "Favorites", href: "/favorites" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className='bg-card border-t border-border pt-16 pb-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Top Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          {/* Brand Column */}
          <div>
            <div className='flex items-center space-x-3 mb-6'>
              <div className='w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center'>
                <Film className='w-5 h-5 text-black' />
              </div>
              <span className='text-xl font-bold text-yellow-500'>
                TheMovieGuide
              </span>
            </div>
            <p className='text-muted-foreground mb-6'>
              Your ultimate destination for discovering movies and TV shows.
              Join millions of users exploring the best entertainment content.
            </p>
          </div>

          {/* Dynamic Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className='text-lg font-semibold text-foreground mb-6'>
                {section.title}
              </h3>
              <ul className='space-y-3'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-muted-foreground hover:text-primary transition-colors'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between'>
          <p className='text-muted-foreground text-sm'>
            © {new Date().getFullYear()} TheMovieGuide. All rights reserved.
          </p>

          <div className='flex items-center space-x-6 mt-4 sm:mt-0 text-xs sm:text-sm text-muted-foreground'>
            <span>Powered by TMDB API</span>
            <span className='flex items-center'>
              Made with
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 mx-1 text-red-500'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M3.172 5.172a4 4 0 015.656 0L10 
                     6.343l1.172-1.171a4 4 0 115.656 
                     5.656L10 17.657l-6.828-6.829a4 4 
                     0 010-5.656z'
                  clipRule='evenodd'
                />
              </svg>
              for movie lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

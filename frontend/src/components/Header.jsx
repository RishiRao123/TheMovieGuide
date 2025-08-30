import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Info,
  ChevronDown,
} from "lucide-react";
import axios from "axios";

const Header = () => {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/v1/movies/upcoming`
        );
        setMovies(response.data.response?.results?.slice(0, 6) || []);
      } catch (error) {
        console.error("Failed to fetch upcoming movies:", error);
      }
    };
    fetchUpcoming();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [movies]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % movies.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);

  if (!movies.length) return null;

  return (
    <section className='relative h-[75vh] md:h-[80vh] w-full overflow-hidden mb-2.5'>
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
            index === currentSlide
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background image with less visibility */}
          <div
            className='absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000'
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              opacity: 0.35,
            }}
          />

          {/* Light overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent' />

          {/* Slide content */}
          <div className='absolute bottom-0 left-0 p-6 md:p-12 text-white max-w-xl ml-8'>
            <h2 className='text-3xl md:text-5xl font-bold mb-2'>
              {movie.title}
            </h2>
            <div className='flex items-center space-x-3 mb-3'>
              <span className='bg-yellow-400 text-black px-2 py-1 rounded text-sm font-semibold'>
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className='text-yellow-400 font-medium'>
                {movie.release_date?.slice(0, 4)}
              </span>
            </div>
            <p className='text-sm md:text-base text-gray-200 mb-4 line-clamp-3'>
              {movie.overview}
            </p>
            <div className='flex space-x-3'>
              <button className='bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 md:px-6 md:py-3 font-semibold rounded-lg flex items-center transition-colors cursor-pointer'>
                <Play className='mr-2 h-4 w-4 md:h-5 md:w-5' />
                Watch Trailer
              </button>
              <button className='bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-2 md:px-6 md:py-3 font-semibold rounded-lg flex items-center transition-colors cursor-pointer'>
                <Info className='mr-2 h-4 w-4 md:h-5 md:w-5' />
                More Info
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination dots with pointer */}
      <div className='absolute bottom-16 right-6 flex space-x-2 z-10'>
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-colors cursor-pointer ${
              index === currentSlide
                ? "bg-yellow-400"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 transition-colors cursor-pointer'
      >
        <ChevronLeft className='h-6 w-6' />
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 transition-colors cursor-pointer'
      >
        <ChevronRight className='h-6 w-6' />
      </button>

      {/* Down indicator */}
      <div className='fixed left-1/2 bottom-4 -translate-x-1/2 z-[999] animate-bounce cursor-pointer'>
        <ChevronDown size={36} className='text-primary drop-shadow-lg' />
      </div>
    </section>
  );
};

export default Header;

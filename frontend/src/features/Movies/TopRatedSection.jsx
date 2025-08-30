import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCarousel from "../../components/MovieCarousel";

const TopRatedSection = () => {
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  const getTopRatedMovies = async () => {
    try {
      const url = `${BackendUrl}/api/v1/movies/top-rated`; 
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      setMovies(response.data.response?.results || []);
      setErrors(null);
    } catch (error) {
      setErrors(error.response?.data?.message || "Failed to fetch top-rated movies.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  if (isLoading) return <p className='text-center'>Loading...</p>;
  if (errors) return <p className='text-center text-red-500'>{errors}</p>;

  return <MovieCarousel movies={movies} title='Top Rated Movies' />;
};

export default TopRatedSection;

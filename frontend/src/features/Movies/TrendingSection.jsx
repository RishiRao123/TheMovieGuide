import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCarousel from "../../components/MovieCarousel";

const TrendingSection = () => {
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const BackendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const getTrendingMovies = async () => {
    try {
      const url = `${BackendUrl}/api/v1/movies/trending`;
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      setMovies(response.data.response?.results || []);
      setErrors(null);
    } catch (error) {
      setErrors(error.response?.data?.message || "Failed to fetch movies.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  if (isLoading) return <p className='text-center'>Loading...</p>;
  if (errors) return <p className='text-center text-red-500'>{errors}</p>;

  return <MovieCarousel movies={movies} title='Trending Now' />;
};

export default TrendingSection;

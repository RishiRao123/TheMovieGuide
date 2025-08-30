import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCarousel from "../../components/MovieCarousel";

const PopularSection = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPopularMovies = async () => {
    try {
      const url = "/api/v1/movies/popular";
      const response = await axios.get(url, {
        headers: {
          ContentType: "application/json",
        },
      });

      setMovies(response.data.response || []);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch movies.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  if (isLoading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;

  return <MovieCarousel movies={movies} title='Popular Movies' />;
};

export default PopularSection;

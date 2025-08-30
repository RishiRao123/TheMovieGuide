import React, { useState, useEffect } from "react";
import axios from "axios";
import TvSeriesCarousel from "../../components/TvSeriesCarousel";

const TrendingTvSection = () => {
  const [tvShows, setTvShows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const getTrendingTv = async () => {
    try {
      const url = `${BackendUrl}/api/v1/tv/trending`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTvShows(response.data.response?.results || []);
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch trending TV shows."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrendingTv();
  }, []);

  if (isLoading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;

  return <TvSeriesCarousel tvSeries={tvShows} title='Trending TV Shows' />;
};

export default TrendingTvSection;

import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCarousel from "../../components/MovieCarousel";

const RecommendedSection = ({ id }) => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!id) return;
    const fetchMoviesRecommended = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BackendUrl}/api/v1/movies/recommended/${id}}`
        );

        setRecommended(res.data.response.results);
        setError(null);
      } catch (error) {
        setError("Failed to fetch recommendations");
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesRecommended();
  }, [id]);

  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;

  return <MovieCarousel movies={recommended} title='Similar Movies' />;
};

export default RecommendedSection;

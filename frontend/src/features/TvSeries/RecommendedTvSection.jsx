import React, { useEffect, useState } from "react";
import axios from "axios";
import TvSeriesCarousel from "../../components/TvSeriesCarousel";

const RecommendedTvSection = ({ id }) => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!id) return;

    const fetchTvRecommended = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BackendUrl}/api/v1/tv/recommended/${id}`
        );
        setRecommended(res.data.response.results || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch recommendations");
        console.error("Error fetching TV recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTvRecommended();
  }, [id]);

  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;

  return <TvSeriesCarousel tvSeries={recommended} title='Similar TV Shows' />;
};

export default RecommendedTvSection;

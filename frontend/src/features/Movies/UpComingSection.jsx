import React, { useContext } from "react";
import MovieCarousel from "../../components/MovieCarousel";
import { MediaContext } from "../../context/MediaContext";

const UpComingSection = () => {
  const { movies, loading, error } = useContext(MediaContext);

  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;

  return <MovieCarousel movies={movies.upcoming} title='Upcoming Movies' />;
};

export default UpComingSection;

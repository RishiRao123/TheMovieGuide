import React, { useContext } from "react";
import MovieCarousel from "../../components/MovieCarousel";
import { MediaContext } from "../../context/MediaContext"; // updated

const PopularSection = () => {
  const { movies, loading } = useContext(MediaContext);

  if (loading) return <p className='text-center'>Loading...</p>;
  if (!movies.popular || movies.popular.length === 0)
    return (
      <p className='text-center text-gray-400'>No popular movies found.</p>
    );

  return <MovieCarousel movies={movies.popular} title='Popular Movies' />;
};

export default PopularSection;

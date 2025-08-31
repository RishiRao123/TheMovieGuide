import React, { useContext } from "react";
import MovieCarousel from "../../components/MovieCarousel";
import { MediaContext } from "../../context/MediaContext";
import Skeleton from "../../components/ui/Skeleton";

const PopularSection = () => {
  const { movies, loading } = useContext(MediaContext);

  if (loading) {
    return (
      <div className='mt-6'>
        <h2 className='text-xl font-bold text-white mb-4'>Popular Movies</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!movies.popular || movies.popular.length === 0) {
    return (
      <p className='text-center text-gray-400'>No popular movies found.</p>
    );
  }

  return <MovieCarousel movies={movies.popular} title='Popular Movies' />;
};

export default PopularSection;

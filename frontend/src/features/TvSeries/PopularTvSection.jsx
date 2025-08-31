import React, { useContext } from "react";
import { MediaContext } from "../../context/MediaContext";
import TvSeriesCarousel from "../../components/TvSeriesCarousel";

const PopularTvSection = () => {
  const { tvShows, loading, error } = useContext(MediaContext);

  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;

  return (
    <TvSeriesCarousel tvSeries={tvShows.popular} title='Popular TV Shows' />
  );
};

export default PopularTvSection;

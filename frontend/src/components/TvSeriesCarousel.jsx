import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import TvCard from "./TvCard";

const TvSeriesCarousel = ({ tvSeries = [], title = "" }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className='py-16' data-testid='tv-carousel'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header: Title + Controls */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4'>
          <h2 className='text-3xl font-bold text-white'>{title}</h2>

          <div className='flex items-center space-x-4'>
            <a
              href='#'
              className='text-yellow-500 hover:text-yellow-400 font-medium flex items-center gap-2'
            >
              View All
              <ArrowRight className='w-4 h-4' />
            </a>

            {/* Scroll Buttons */}
            <div className='flex space-x-2'>
              <button
                onClick={() => scroll("left")}
                className='group w-10 h-10 flex items-center justify-center rounded-md border bg-gray-700 hover:bg-yellow-500 transition'
              >
                <ChevronLeft className='w-6 h-6 text-white group-hover:text-black' />
              </button>
              <button
                onClick={() => scroll("right")}
                className='group w-10 h-10 flex items-center justify-center rounded-md border bg-gray-700 hover:bg-yellow-500 transition'
              >
                <ChevronRight className='w-6 h-6 text-white group-hover:text-black' />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className='overflow-x-auto scrollbar-hide relative'
        >
          <div className='flex space-x-6 min-w-max'>
            {tvSeries.length === 0 && (
              <p className='text-gray-400'>No TV shows found.</p>
            )}

            {tvSeries.map((tvShow) => (
              <TvCard
                key={tvShow.id}
                name={tvShow.name || tvShow.original_name || tvShow.title}
                rating={tvShow.vote_average}
                tvID={tvShow.id}
                poster={
                  tvShow.poster_path
                    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
                    : "/fallback-poster.jpg"
                }
                size='medium'
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TvSeriesCarousel;

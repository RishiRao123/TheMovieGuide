import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import MovieCard from "./MovieCard";

const MovieCarousel = ({ movies = [], title = "" }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className='py-16' data-testid='carousel-dummy'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Title + Controls */}
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl font-bold text-foreground'>{title}</h2>

          <div className='flex items-center space-x-4'>
            <a
              href='#'
              className='text-primary hover:text-primary/80 font-medium flex items-center gap-2'
            >
              View All
              <ArrowRight className='w-4 h-4' />
            </a>

            {/* Navigation Buttons */}
            <div className='flex space-x-2'>
              {/* Left Button */}
              <button
                onClick={() => scroll("left")}
                className='group w-10 h-10 flex items-center justify-center rounded-md border bg-gray-700 hover:bg-[#FFBF00] transition cursor-pointer'
              >
                <ChevronLeft className='w-6 h-6 text-white group-hover:text-black' />
              </button>

              {/* Right Button */}
              <button
                onClick={() => scroll("right")}
                className='group w-10 h-10 flex items-center justify-center rounded-md border bg-gray-700 hover:bg-[#FFBF00] transition cursor-pointer'
              >
                <ChevronRight className='w-6 h-6 text-white group-hover:text-black' />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Movie Cards */}
        <div ref={scrollRef} className='scroll-container overflow-x-auto pb-4'>
          <div className='flex space-x-6 w-max'>
            {Array.isArray(movies) &&
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  rating={movie.vote_average}
                  movieID={movie.id}
                  poster={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
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

export default MovieCarousel;

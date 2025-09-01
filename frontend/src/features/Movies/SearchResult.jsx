import MovieCard from "../../components/MovieCard";
import TvCard from "../../components/TvCard";

const SearchResult = ({
  submittedQuery,
  activeTab,
  setActiveTab,
  results,
  loading,
  page,
  setPage,
}) => {
  const renderResults = () => {
    if (loading) {
      return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className='bg-gray-900 rounded-xl overflow-hidden animate-pulse aspect-[2/3]'
            >
              <div className='bg-gray-800 h-full w-full'></div>
            </div>
          ))}
        </div>
      );
    }

    if (!results.length && submittedQuery) {
      return (
        <div className='text-center py-12'>
          <p className='text-gray-400'>
            No results found for "{submittedQuery}"
          </p>
          <p className='text-sm text-gray-500 mt-2'>
            Try adjusting your search terms.
          </p>
        </div>
      );
    }

    const filteredResults = results.filter((item) => {
      const mediaType =
        item.media_type || (activeTab === "movies" ? "movie" : "tv");
      return mediaType === "movie" || mediaType === "tv";
    });

    return (
      <>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8'>
          {filteredResults.map((item) => {
            const mediaType =
              item.media_type || (activeTab === "movies" ? "movie" : "tv");

            if (mediaType === "movie") {
              return (
                <MovieCard
                  key={`movie-${item.id}`}
                  movieID={item.id}
                  title={item.title}
                  rating={item.vote_average}
                  poster={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : null
                  }
                  size='small'
                />
              );
            }

            if (mediaType === "tv") {
              return (
                <TvCard
                  key={`tv-${item.id}`}
                  tvID={item.id}
                  name={item.name}
                  rating={item.vote_average}
                  poster={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : null
                  }
                  size='small'
                />
              );
            }

            return null; // safety
          })}
        </div>

        {filteredResults.length > 0 && (
          <div className='text-center'>
            <button
              onClick={() => setPage(page + 1)}
              className='px-8 py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors'
            >
              Load More Results
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className='mb-6'>
        <p className='text-gray-400'>Search results for "{submittedQuery}"</p>
      </div>

      {/* Tabs */}
      <div className='mb-6'>
        <div className='bg-gray-900 rounded-lg p-1 inline-flex space-x-1'>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "all"
                ? "bg-black text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("movies")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "movies"
                ? "bg-black text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab("tv")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "tv"
                ? "bg-black text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            TV Shows
          </button>
        </div>
      </div>

      {renderResults()}
    </>
  );
};

export default SearchResult;

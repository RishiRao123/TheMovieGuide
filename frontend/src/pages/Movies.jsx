import React, { useState, useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard"; // Make sure the path is correct
import { ChevronDown } from "lucide-react";

// --- Enriched Dummy Data with Genres and Full Dates ---
const genreMap = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

 const allDummyMovies = [
  {
    id: 1,
    title: "War of the Worlds",
    release_date: "2025-07-11",
    vote_average: 4.3,
    poster_path: "/qDisvpLkyyQy5uB5K8iL1OBCa3.jpg",
    genre_ids: [878, 53],
  },
  {
    id: 2,
    title: "F1",
    release_date: "2025-06-27",
    vote_average: 7.8,
    poster_path: "/9PXZIUsSDh4alB80jheWX4fhZmy.jpg",
    genre_ids: [18, 28],
  },
  {
    id: 3,
    title: "Superman",
    release_date: "2025-07-11",
    vote_average: 7.5,
    poster_path: "/lZ2sOCMCcsFqYRCRs4DP2M_e53p.jpg",
    genre_ids: [28, 878],
  },
  {
    id: 4,
    title: "Eenie Meanie",
    release_date: "2025-01-15",
    vote_average: 6.4,
    poster_path: "/i1p4mpJ2tN0fI4aA2d2IKM43G7v.jpg",
    genre_ids: [53, 27],
  },
  {
    id: 5,
    title: "Mission: Impossible",
    release_date: "2025-05-23",
    vote_average: 7.2,
    poster_path: "/z2sOCMCcsFqYRCRs4DP2M_e53p.jpg",
    genre_ids: [28, 12, 53],
  },
  {
    id: 6,
    title: "Jurassic World Rebirth",
    release_date: "2025-06-13",
    vote_average: 7.2,
    poster_path: "/xAqTNx7sCRkyx5fV2o21TBPmiA9.jpg",
    genre_ids: [12, 878],
  },
  {
    id: 7,
    title: "Dune: Part Three",
    release_date: "2026-03-20",
    vote_average: 8.5,
    poster_path: "/d5NXSklXo0qyIY2Vvchwsy6wKfg.jpg",
    genre_ids: [878, 12],
  },
  {
    id: 8,
    title: "Avatar 3",
    release_date: "2026-12-18",
    vote_average: 8.1,
    poster_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    genre_ids: [878, 28, 12],
  },
  {
    id: 9,
    title: "The Batman Part II",
    release_date: "2026-10-02",
    vote_average: 8.3,
    poster_path: "/74xTEgt7R36Fpooo50r9T25onU6.jpg",
    genre_ids: [80, 18, 53],
  },
  {
    id: 10,
    title: "Spider-Man: Beyond the Spider-Verse",
    release_date: "2026-03-27",
    vote_average: 9.0,
    poster_path: "/h5Ossoh5pBe4R9aY0WJt2sOusY.jpg",
    genre_ids: [16, 28, 12],
  },
  {
    id: 11,
    title: "Inception 2",
    release_date: "2025-12-19",
    vote_average: 8.8,
    poster_path: "/8hP9D40gYjguUf82Lj17Oy9xG52.jpg",
    genre_ids: [878, 12, 53],
  },
  {
    id: 12,
    title: "The Matrix Resurrections 2",
    release_date: "2025-12-22",
    vote_average: 6.5,
    poster_path: "/8c4a8kE79hQqrgSgEpjVd7uG3KN.jpg",
    genre_ids: [878, 28],
  },
  {
    id: 13,
    title: "Gladiator 2",
    release_date: "2025-11-22",
    vote_average: 8.0,
    poster_path: "/9A0QDw3aw2iJr3mELk_3i2k9wSU.jpg",
    genre_ids: [28, 12, 18],
  },
  {
    id: 14,
    title: "The Lord of the Rings: The War of the Rohirrim",
    release_date: "2024-12-13",
    vote_average: 8.2,
    poster_path: "/c2oc28i8Gv2O6A2d2Qbkf9F6Y9r.jpg",
    genre_ids: [16, 12, 14, 10752],
  },
  {
    id: 15,
    title: "Wicked",
    release_date: "2024-11-27",
    vote_average: 7.5,
    poster_path: "/pNm2oK2s0hGg6a3j3Nf6p2put8D.jpg",
    genre_ids: [14, 10751, 10402],
  },
  {
    id: 16,
    title: "Mufasa: The Lion King",
    release_date: "2024-12-20",
    vote_average: 7.8,
    poster_path: "/3f22R1n22u2n2Iax2q1EB2hJ2v7.jpg",
    genre_ids: [12, 10751, 18],
  },
  {
    id: 17,
    title: "Blade",
    release_date: "2025-11-07",
    vote_average: 7.9,
    poster_path: "/1R6iPQ57I55g2DBaA2sIov2tLoW.jpg",
    genre_ids: [28, 14, 27],
  },
  {
    id: 18,
    title: "Fantastic Four",
    release_date: "2025-07-25",
    vote_average: 8.1,
    poster_path: "/a2j1nAj5h2r20CdB2v3a1d4sS3e.jpg",
    genre_ids: [28, 12, 878],
  },
  {
    id: 19,
    title: "Captain America: Brave New World",
    release_date: "2025-02-14",
    vote_average: 7.6,
    poster_path: "/fVu2k1dn4p3h80G9zYI5wT0g9N.jpg",
    genre_ids: [28, 878],
  },
  {
    id: 20,
    title: "Thunderbolts",
    release_date: "2025-07-25",
    vote_average: 7.7,
    poster_path: "/3MS2a52QvT2x2aN95yVmqHjN2n.jpg",
    genre_ids: [28, 12, 878],
  },
];

const genres = ["All Genres", ...Object.keys(genreMap)];
const years = [
  "Any Year",
  ...Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + 2 - i),
]; // Allow future years
const sortOptions = {
  "Most Popular": (a, b) => b.vote_average - a.vote_average, // simplified popularity
  "Least Popular": (a, b) => a.vote_average - b.vote_average,
  "Newest First": (a, b) => new Date(b.release_date) - new Date(a.release_date),
  "Oldest First": (a, b) => new Date(a.release_date) - new Date(b.release_date),
  "Highest Rated": (a, b) => b.vote_average - a.vote_average,
  "Lowest Rated": (a, b) => a.vote_average - b.vote_average,
};

const SkeletonCard = () => (
  <div className='bg-gray-900 rounded-xl overflow-hidden animate-pulse aspect-[2/3]'>
    <div className='bg-gray-800 h-full w-full'></div>
  </div>
);

const Dropdown = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-gray-800 px-5 py-3 rounded-lg text-sm flex items-center justify-between w-48 hover:bg-gray-700 transition-colors h-12'
      >
        <span>{selected}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul className='absolute z-10 top-14 left-0 w-48 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className='px-5 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer text-sm'
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedYear, setSelectedYear] = useState("Any Year");
  const [selectedSort, setSelectedSort] = useState("Most Popular");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let processedMovies = [...allDummyMovies];

      // Filter by Genre
      if (selectedGenre !== "All Genres") {
        const genreId = genreMap[selectedGenre];
        processedMovies = processedMovies.filter((movie) =>
          movie.genre_ids.includes(genreId)
        );
      }

      // Filter by Year
      if (selectedYear !== "Any Year") {
        processedMovies = processedMovies.filter((movie) =>
          movie.release_date.startsWith(selectedYear)
        );
      }

      // Sort movies
      processedMovies.sort(sortOptions[selectedSort]);

      setFilteredMovies(processedMovies);
      setMovies(processedMovies.slice(0, 20)); // Set the first page of results
      setLoading(false);
    }, 1000);
  }, [selectedGenre, selectedYear, selectedSort]);

  const handleLoadMore = () => {
    const currentLength = movies.length;
    const nextMovies = filteredMovies.slice(currentLength, currentLength + 20);
    setMovies((prev) => [...prev, ...nextMovies]);
  };

  const createFilterHandler = (setter) => (value) => {
    setter(value);
    setPage(1); // Reset page on any filter change
    setMovies([]); // Clear current movies to show loading state for new filter
  };

  const resetFilters = () => {
    setSelectedGenre("All Genres");
    setSelectedYear("Any Year");
    setSelectedSort("Most Popular");
    setPage(1);
    setMovies([]);
  };

  return (
    <div className='min-h-screen bg-gray-950 text-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-4xl lg:text-5xl font-bold'>Movies</h1>
          <p className='text-gray-400 mt-1'>
            Discover amazing movies from around the world
          </p>
        </div>

        <div className='p-4 bg-gray-900 rounded-xl mb-8 flex flex-col lg:flex-row items-center justify-between gap-4'>
          <div className='flex flex-wrap items-center gap-4'>
            <Dropdown
              options={genres}
              selected={selectedGenre}
              onSelect={createFilterHandler(setSelectedGenre)}
            />
            <Dropdown
              options={years}
              selected={selectedYear}
              onSelect={createFilterHandler(setSelectedYear)}
            />
            <Dropdown
              options={Object.keys(sortOptions)}
              selected={selectedSort}
              onSelect={createFilterHandler(setSelectedSort)}
            />
            <button
              onClick={resetFilters}
              className='text-sm text-gray-400 hover:text-white transition h-12 px-4'
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className='mb-6'>
          <p className='text-gray-400 text-sm'>
            Showing {movies.length} of {filteredMovies.length} movies
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
          {loading
            ? Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieID={movie.id}
                  title={movie.title}
                  rating={movie.vote_average}
                  poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  size='small'
                />
              ))}
        </div>

        {movies.length > 0 && movies.length < filteredMovies.length && (
          <div className='text-center mt-12'>
            <button
              onClick={handleLoadMore}
              className='px-8 py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors'
            >
              Load More Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;

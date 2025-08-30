import React, { useState, useEffect } from "react";
import { Grid, List } from "lucide-react";
import MovieCard from "../components/MovieCard";
import axios from "axios";

const genresData = {
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 878, name: "Science Fiction" },
  ],
};

export default function Movies() {
  const [viewMode, setViewMode] = useState("grid");
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Fetch popular movies
  const getPopularMovies = async () => {
    try {
      const url = "/api/v1/movies/popular";
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("API Response:", response.data);

      const moviesData =
        response.data.result || response.data.results || [];

      setMovies(moviesData);
    } catch (error) {
      setErrors(error.response?.data?.message || "Failed to fetch movies.");
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Movies</h1>
          <p className="text-gray-400">
            Discover amazing movies from around the world
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-gray-900 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              {/* Genre Filter */}
              <select className="w-40 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="all">All Genres</option>
                {genresData.genres.map((g) => (
                  <option key={g.id} value={g.id.toString()}>
                    {g.name}
                  </option>
                ))}
              </select>

              {/* Year Filter */}
              <select className="w-32 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="any">Any Year</option>
                {years.map((y) => (
                  <option key={y} value={y.toString()}>
                    {y}
                  </option>
                ))}
              </select>

              {/* Sort By Filter */}
              <select className="w-48 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="popularity.desc">Most Popular</option>
                <option value="release_date.desc">Newest First</option>
                <option value="vote_average.desc">Highest Rated</option>
              </select>

              <button className="px-4 py-2 text-sm font-medium rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors">
                Reset Filters
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Error Handling */}
        {errors && <p className="text-red-500 text-sm mb-4">{errors}</p>}

        {/* Results */}
        <div>
          <div className="mb-6">
            <p className="text-gray-400">Showing {movies.length} movies</p>
          </div>

          <div
            className={`grid gap-6 mb-8 ${
              viewMode === "grid"
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {Array.isArray(movies) && movies.length > 0 ? (
              movies.map((movie) => (
                <p>{movie.response.id}</p>
              ))
            ) : (
              <p className="text-gray-400">No movies found.</p>
            )}
          </div>

          <div className="text-center">
            <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
              Load More Movies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

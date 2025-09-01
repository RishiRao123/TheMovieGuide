import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search as SearchIcon } from "lucide-react";
import SearchIdle from "../components/SearchIdle";
import SearchResult from "../features/Movies/SearchResult";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

const Search = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  // 🔹 Movies search
  const fetchMovies = async (q, page = 1) => {
    const { data } = await axios.get(`${BackendUrl}/api/v1/movies/search`, {
      params: { q, page },
    });
    return data.response.results || [];
  };

  // 🔹 TV search
  const fetchTv = async (q, page = 1) => {
    const { data } = await axios.get(`${BackendUrl}/api/v1/tv/search`, {
      params: { q, page },
    });
    return data.response.results || [];
  };

  // 🔹 Combined (for "all" tab)
  const fetchAll = async (q, page = 1) => {
    const [moviesRes, tvRes] = await Promise.all([
      fetchMovies(q, page),
      fetchTv(q, page),
    ]);
    return [...moviesRes, ...tvRes];
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setPage(1);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        setResults([]);

        let data = [];
        if (activeTab === "movies") {
          data = await fetchMovies(query, page);
        } else if (activeTab === "tv") {
          data = await fetchTv(query, page);
        } else {
          data = await fetchAll(query, page);
        }

        setResults(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, activeTab, page]);

  return (
    <div className='min-h-screen text-white py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-4xl lg:text-5xl font-bold'>Search</h1>
          <p className='text-gray-400 mt-1'>
            Find your next favorite movie or TV show
          </p>
        </div>

        {/* Search Input */}
        <div className='bg-[#16181D] rounded-xl p-6 mb-8 border'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1 bg-[#0D0F12] border-1 rounded-xl'>
              <input
                type='text'
                placeholder='Search for movies, TV shows...'
                value={query}
                onChange={(e) => {
                  setPage(1); // reset to page 1 when typing new query
                  setQuery(e.target.value);
                }}
                className='w-full h-12 text-white placeholder-gray-500 rounded-lg px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              />
              <SearchIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500' />
            </div>
          </div>
        </div>

        {/* Switch between idle and results */}
        {query.trim() ? (
          <SearchResult
            submittedQuery={query}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            results={results}
            loading={loading}
            page={page}
            setPage={setPage}
          />
        ) : (
          <SearchIdle />
        )}
      </div>
    </div>
  );
};

export default Search;

import React, { useState, useEffect } from "react";
import { Star, Calendar, Clock, Heart, Bookmark, Play } from "lucide-react";
import { useParams } from "react-router-dom";
import RecommendedTvSection from "../features/TvSeries/RecommendedTvSection";
import axios from "axios";

const TvDetails = () => {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!id) return;

    const fetchTvDetails = async () => {
      try {
        const { data } = await axios.get(`${BackendUrl}/api/v1/tv/${id}`);

        setTv(data.result);
      } catch (error) {
        console.error("Error fetching TV details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTvDetails();
  }, [id, BackendUrl]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen text-white bg-gray-950'>
        Loading...
      </div>
    );
  }

  if (!tv) {
    return (
      <div className='flex justify-center items-center h-screen text-white bg-gray-950'>
        Failed to load TV show.
      </div>
    );
  }

  const tabLinks = ["overview", "cast", "reviews"];

  return (
    <div className='bg-gray-950 text-white font-sans'>
      {/* Hero Section */}
      <div className='relative h-[60vh] overflow-hidden'>
        <div className='absolute inset-0'>
          <img
            src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
            alt={tv.name}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent' />
        </div>

        <div className='relative z-10 h-full flex items-end'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full'>
            <div className='flex flex-col md:flex-row gap-8 items-end'>
              {/* Poster */}
              <div className='flex-shrink-0'>
                <img
                  src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                  alt={tv.name}
                  className='w-48 md:w-64 rounded-xl shadow-2xl'
                />
              </div>

              {/* Title and Actions */}
              <div className='flex-1 min-w-0'>
                <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>
                  {tv.name}
                </h1>
                <p className='text-xl text-gray-400 mb-4 italic'>
                  {tv.tagline}
                </p>
                <div className='flex flex-wrap items-center gap-x-6 gap-y-2 mb-6'>
                  <div className='flex items-center space-x-1'>
                    <Star className='w-5 h-5 text-yellow-400 fill-current' />
                    <span className='text-lg font-semibold'>
                      {tv.vote_average?.toFixed(1)}
                    </span>
                    <span className='text-gray-400'>({tv.vote_count})</span>
                  </div>
                  <div className='flex items-center space-x-2 text-gray-400'>
                    <Calendar className='w-4 h-4' />
                    <span>{tv.first_air_date?.slice(0, 4)}</span>
                  </div>
                  <div className='flex items-center space-x-2 text-gray-400'>
                    <Clock className='w-4 h-4' />
                    <span>
                      {tv.episode_run_time?.length > 0
                        ? `${tv.episode_run_time[0]} min`
                        : "N/A"}
                    </span>
                  </div>
                </div>
                <div className='flex flex-wrap gap-3'>
                  <button className='flex items-center px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors'>
                    <Play className='w-4 h-4 mr-2' />
                    Watch Trailer
                  </button>
                  <button className='flex items-center px-4 py-2 rounded-lg border border-gray-600 bg-gray-800/50 text-white hover:bg-yellow-500 hover:text-black transition-colors'>
                    <Bookmark className='w-4 h-4 mr-2' />
                    Add to Watchlist
                  </button>
                  <button className='flex items-center px-4 py-2 rounded-lg border border-gray-600 bg-gray-800/50 text-white hover:bg-yellow-500 hover:text-black transition-colors'>
                    <Heart className='w-4 h-4 mr-2' />
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Left Column: Tabs and Content */}
          <div className='lg:col-span-2'>
            {/* Tab Navigation */}
            <nav className='mb-8'>
              <div className='flex bg-gray-800/60 rounded-lg p-2 w-full max-w-lg'>
                {tabLinks.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 capitalize py-3 rounded-md text-base font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-yellow-500 text-black font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </nav>

            {/* Tab Content */}
            <div className='bg-gray-900 rounded-xl p-6'>
              {activeTab === "overview" && (
                <div>
                  <h2 className='text-2xl font-bold mb-4'>Synopsis</h2>
                  <p className='text-gray-400 leading-relaxed'>{tv.overview}</p>
                  <div className='mt-6'>
                    <h3 className='text-lg font-semibold mb-3'>Genres</h3>
                    <div className='flex flex-wrap gap-2'>
                      {tv.genres?.map((genre) => (
                        <span
                          key={genre.id}
                          className='px-3 py-1 text-sm font-semibold rounded-md bg-yellow-500 text-black'
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='mt-6'>
                    <h3 className='text-lg font-semibold mb-2'>Creators</h3>
                    <p className='text-gray-400'>
                      {tv.creators?.length > 0
                        ? tv.creators.map((c) => c.name).join(", ")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "cast" && (
                <div>
                  <h2 className='text-2xl font-bold mb-4'>Cast</h2>
                  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                    {tv.credits?.slice(0, 6).map((person) => (
                      <div
                        key={person.id}
                        className='bg-gray-800 rounded-lg p-4 text-center shadow hover:shadow-lg transition'
                      >
                        <img
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                              : "https://via.placeholder.com/300x450?text=No+Image"
                          }
                          alt={person.name}
                          className='w-full h-40 object-cover rounded-lg mb-3'
                        />
                        <h4 className='font-semibold text-sm text-white truncate'>
                          {person.name}
                        </h4>
                        <p className='text-xs text-gray-400'>
                          {person.character}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h2 className='text-2xl font-bold mb-4'>User Reviews</h2>
                  <p className='text-gray-400'>
                    Reviews feature coming soon! Sign up to be the first to
                    leave a review.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className='space-y-6'>
            <div className='bg-gray-900 rounded-xl p-6'>
              <h3 className='text-lg font-semibold mb-4 text-white'>Details</h3>
              <div className='space-y-3 text-sm'>
                <div>
                  <span className='text-gray-400'>Status:</span>
                  <span className='ml-2 text-white font-semibold'>
                    {tv.status}
                  </span>
                </div>
                <div>
                  <span className='text-gray-400'>Original Language:</span>
                  <span className='ml-2 text-white font-semibold capitalize'>
                    {tv.original_language}
                  </span>
                </div>
                <div>
                  <span className='text-gray-400'>Streaming On:</span>
                  <div className='ml-2 flex flex-wrap gap-2 mt-2'>
                    {tv.streamingProviders &&
                    tv.streamingProviders.length > 0 ? (
                      tv.streamingProviders.map((provider) => (
                        <div
                          key={provider.provider_id}
                          className='flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg'
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                            alt={provider.provider_name}
                            className='w-6 h-6 rounded'
                          />
                          <span className='text-sm text-white font-medium'>
                            {provider.provider_name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className='text-gray-500'>Not available</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecommendedTvSection id={id} />
    </div>
  );
};

export default TvDetails;

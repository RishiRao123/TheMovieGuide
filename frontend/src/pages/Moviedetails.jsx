import React, { useState } from "react";
import { Star, Calendar, Clock, Heart, Bookmark, Play } from "lucide-react";

// Hardcoded data for demonstration purposes
const movieDetailsData = {
  title: "F1",
  tagline: "This is just the start",
  backdropUrl:
    "https://image.tmdb.org/t/p/original/ZtcGMc204JsNqfjS9lU6udRgpo.jpg",
  posterUrl:
    "https://image.tmdb.org/t/p/original//9PXZIUsSDh4alB80jheWX4fhZmy.jpg",
  rating: "7.8",
  voteCount: "1566",
  year: "2025",
  runtime: "156 min",
  overview:
    "Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.",
  genres: [
    { id: 28, name: "Action" },
    { id: 18, name: "Drama" },
  ],
  director: { name: "Joseph Kosinski" },
  status: "Released",
  cast: [
    {
      id: 1,
      name: "Brad Pitt",
      character: "Sonny Hayes",
      profile_path:
        "https://image.tmdb.org/t/p/w300/cckcYc2v0yh1tc9QjRelptcOBko.jpg",
    },
    {
      id: 2,
      name: "Damson Idris",
      character: "Joshua Pearce",
      profile_path:
        "https://image.tmdb.org/t/p/w300/A2LhL2Ym912uWDO2s5Ea272z2yS.jpg",
    },
    {
      id: 3,
      name: "Kerry Condon",
      character: "Kate",
      profile_path:
        "https://image.tmdb.org/t/p/w300/b1s12L2gslq2nmtwG2d4s2d7a2s.jpg",
    },
    {
      id: 4,
      name: "Javier Bardem",
      character: "Team Owner",
      profile_path:
        "https://image.tmdb.org/t/p/w300/kU3B75e4H2bBaG1A3sV3g36B29w.jpg",
    },
    {
      id: 5,
      name: "Tobias Menzies",
      character: "Team Manager",
      profile_path:
        "https://image.tmdb.org/t/p/w300/aE2e5h122n25S4BME85a2t3b1S.jpg",
    },
    {
      id: 6,
      name: "Lewis Hamilton",
      character: "Self",
      profile_path:
        "https://image.tmdb.org/t/p/w300/aN2z2lGAv2T3PG2sSNsK3RX2v15.jpg",
    },
  ],
};

const MovieDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className='bg-gray-950 text-white font-sans'>
      {/* Hero Section */}
      <div className='relative h-[60vh] overflow-hidden'>
        <div className='absolute inset-0'>
          <img
            src={movieDetailsData.backdropUrl}
            alt={movieDetailsData.title}
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
                  src={movieDetailsData.posterUrl}
                  alt={movieDetailsData.title}
                  className='w-48 md:w-64 rounded-xl shadow-2xl'
                />
              </div>

              {/* Title and Actions */}
              <div className='flex-1 min-w-0'>
                <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>
                  {movieDetailsData.title}
                </h1>
                <p className='text-xl text-gray-400 mb-4 italic'>
                  {movieDetailsData.tagline}
                </p>
                <div className='flex flex-wrap items-center gap-x-6 gap-y-2 mb-6'>
                  <div className='flex items-center space-x-1'>
                    <Star className='w-5 h-5 text-yellow-400 fill-current' />
                    <span className='text-lg font-semibold'>
                      {movieDetailsData.rating}
                    </span>
                    <span className='text-gray-400'>
                      ({movieDetailsData.voteCount})
                    </span>
                  </div>
                  <div className='flex items-center space-x-2 text-gray-400'>
                    <Calendar className='w-4 h-4' />
                    <span>{movieDetailsData.year}</span>
                  </div>
                  <div className='flex items-center space-x-2 text-gray-400'>
                    <Clock className='w-4 h-4' />
                    <span>{movieDetailsData.runtime}</span>
                  </div>
                </div>
                <div className='flex flex-wrap gap-3'>
                  <button className='flex items-center px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors'>
                    <Play className='w-4 h-4 mr-2' />
                    Watch Trailer
                  </button>
                  <button className='flex items-center px-4 py-2 rounded-lg border border-gray-600 bg-gray-800/50 hover:bg-yellow-500 transition-colors'>
                    <Bookmark className='w-4 h-4 mr-2' />
                    Add to Watchlist
                  </button>
                  <button className='flex items-center px-4 py-2 rounded-lg border border-gray-600 bg-gray-800/50 hover:bg-yellow-500 hover:text-black transition-colors'>
                    <Heart className='w-4 h-4 mr-2' />
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid lg:grid-cols-3 gap-12'>
          {/* Main Content with Tabs */}
          <div className='lg:col-span-2'>
            <div className='inline-flex h-10 items-center justify-center rounded-md bg-gray-500 p-1 w-full mb-6'>
              <button
                onClick={() => setActiveTab("overview")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all w-full ${
                  activeTab === "overview"
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("cast")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all w-full ${
                  activeTab === "cast"
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Cast & Crew
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all w-full ${
                  activeTab === "reviews"
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Reviews
              </button>
            </div>

            {/* Tab Content */}
            <div className='bg-gray-900 rounded-xl p-6'>
              {activeTab === "overview" && (
                <div>
                  <h2 className='text-2xl font-bold mb-4'>Synopsis</h2>
                  <p className='text-gray-400 leading-relaxed'>
                    {movieDetailsData.overview}
                  </p>
                  <div className='mt-6'>
                    <h3 className='text-lg font-semibold mb-3'>Genres</h3>
                    <div className='flex flex-wrap gap-2'>
                      {movieDetailsData.genres.map((genre) => (
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
                    <h3 className='text-lg font-semibold mb-2'>Director</h3>
                    <p className='text-gray-400'>
                      {movieDetailsData.director.name}
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "cast" && (
                <div>
                  <h2 className='text-2xl font-bold mb-4'>Cast</h2>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                    {movieDetailsData.cast.map((person) => (
                      <div key={person.id} className='text-center'>
                        <img
                          src={person.profile_path}
                          alt={person.name}
                          className='w-full h-40 object-cover rounded-lg mb-2'
                        />
                        <h4 className='font-semibold text-sm text-white'>
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

          {/* Sidebar */}
          <div className='space-y-6'>
            <div className='bg-gray-900 rounded-xl p-6'>
              <h3 className='text-lg font-semibold mb-4 text-white'>Details</h3>
              <div className='space-y-3 text-sm'>
                <div>
                  <span className='text-gray-400'>Status:</span>
                  <span className='ml-2 text-white font-semibold'>
                    {movieDetailsData.status}
                  </span>
                </div>
                <div>
                  <span className='text-gray-400'>Rating:</span>
                  <span className='ml-2 text-white font-semibold'>
                    {movieDetailsData.rating}/10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

import axios from "axios";
import { TMDB_KEY } from "../constants/constants.js";

const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_KEY,
    language: "en-US",
  },
});

// Now Playing Movies
const getNowPlayingMovies = async (req, res) => {
  try {
    const result = await tmdb.get("/movie/now_playing");
    res.status(200).json({
      message: "Success getting now playing movies",
      success: true,
      result: result.data.results,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Trending Movies (daily)
const getTrendingMovies = async (req, res) => {
  try {
    const result = await tmdb.get("/trending/movie/day");
    res.status(200).json({
      message: "Success getting trending movies",
      success: true,
      result: result.data.results,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Popular Movies
const getPopularMovies = async (req, res) => {
  try {
    const result = await tmdb.get("/movie/popular");
    res.status(200).json({
      message: "Success getting popular movies",
      success: true,
      result: result.data.results,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Top Rated Movies
const getTopRatedMovies = async (req, res) => {
  try {
    const result = await tmdb.get("/movie/top_rated");
    res.status(200).json({
      message: "Success getting top rated movies",
      success: true,
      result: result.data.results,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Upcoming Movies
const getUpcomingMovies = async (req, res) => {
  try {
    const result = await tmdb.get("/movie/upcoming");
    res.status(200).json({
      message: "Success getting upcoming movies",
      success: true,
      result: result.data.results,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Search Movies
const searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.status(400).json({
        message: "Query parameter 'q' is required",
        success: false,
      });
    }

    const result = await tmdb.get("/search/movie", {
      params: { query: q },
    });

    res.status(200).json({
      message: "Success searching movies",
      success: true,
      result: result.data.results,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Movie Details + Credits
const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const [details, credits] = await Promise.all([
      tmdb.get(`/movie/${id}`),
      tmdb.get(`/movie/${id}/credits`),
    ]);
    res.status(200).json({
      message: "Success getting movie details",
      success: true,
      result: { ...details.data, credits: credits.data },
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Error Handler
const handleError = (res, error) => {
  console.error(error.response?.data || error.message);
  res.status(500).json({
    message: "Internal server error",
    success: false,
    error: error.message,
  });
};

export {
  getNowPlayingMovies,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
};

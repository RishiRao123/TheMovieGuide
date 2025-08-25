import axios from "axios";

const TMDB_API = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API,
    language: "en-US",
  },
});

// Now Playing Movies
const getNowPlayingMovies = async (req, res) => {
  try {
    const result = await tmdb.get("/movie/now_playing");

    res.status(200).json({
      message: "Success getting trending movies",
      success: true,
      result: result.data.results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
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
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
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
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
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
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
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
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
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
    console.error(error.response?.data || error.message);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export {
  getNowPlayingMovies,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
};

import axios from "axios";
import { TMDB_KEY } from "../constants/constants.js";

const BASE_URL = "https://api.themoviedb.org/3";

// Popular movies
const getPopularMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });

    res.status(200).json({
      message: "Success getting popular movies",
      success: true,
      response: response.data.results,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Trending movies
const getTrendingMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: {
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });
    res.status(200).json({
      message: "Success getting trending movies",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// TopRated movies
const getTopRatedMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });

    res.status(200).json({
      message: "Success getting top rated movies",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Upcoming movies
const getUpcomingMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });

    res.status(200).json({
      message: "Success getting upcoming movies",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Nowplaying movies
const getNowPlayingMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });

    res.status(200).json({
      message: "Success getting now playing movies",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Search movies
const searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      res
        .status(400)
        .json({ message: "Query parameter q is required", success: false });
    }

    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        query: q,
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });

    res.status(200).json({
      message: "Success searching movies",
      success: true,
      response: response.data,
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
      axios.get(`${BASE_URL}/movie/${id}`, {
        params: { api_key: TMDB_KEY, language: "en-US" },
      }),
      axios.get(`${BASE_URL}/movie/${id}/credits`, {
        params: { api_key: TMDB_KEY, language: "en-US" },
      }),
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

const handleError = (res, error) => {
  console.error(error.response?.data || error.message);
  res.status(500).json({
    message: "Internal server error",
    success: false,
    error: error.message,
  });
};

export {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  searchMovies,
  getMovieDetails,
  getTrendingMovies,
};

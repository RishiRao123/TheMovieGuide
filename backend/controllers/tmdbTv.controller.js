import axios from "axios";
import { TMDB_KEY } from "../constants/constants.js";

const BASE_URL = "https://api.themoviedb.org/3";

// Airing today tv series
const getAiringTodayTv = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/airing_today`, {
      params: { api_key: TMDB_KEY, language: "en-US" },
    });

    res.status(200).json({
      message: "Success getting airing today tv series",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// On the air(upcoming in 7 days) tv series
const getOnTheAirTv = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/on_the_air`, {
      params: { api_key: TMDB_KEY, language: "en-US" },
    });

    res.status(200).json({
      message: "Success getting on the air tv series",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Popular tv series
const getPopularTv = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
      params: { api_key: TMDB_KEY, language: "en-US" },
    });

    res.status(200).json({
      message: "Success getting popular tv series",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Top rated tv series
const getTopRatedTv = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
      params: { api_key: TMDB_KEY, language: "en-US" },
    });

    res.status(200).json({
      message: "Success getting top rated tv series",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Trending today tv series
const getTrendingTodayTv = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/tv/day`, {
      params: { api_key: TMDB_KEY, language: "en-US" },
    });

    res.status(200).json({
      message: "Success getting trending today tv series",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Search tv series
const searchTv = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      res
        .status(400)
        .json({ message: "Query parameter q is required", success: false });
    }

    const response = await axios.get(`${BASE_URL}/search/tv`, {
      params: { query: q, api_key: TMDB_KEY, language: "en-US" },
    });

    res.status(200).json({
      message: "Success searching tv series",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// TV details + credits
const getTvDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const [details, credits, providers] = await Promise.all([
      axios.get(`${BASE_URL}/tv/${id}`, {
        params: { api_key: TMDB_KEY, language: "en-US" },
      }),
      axios.get(`${BASE_URL}/tv/${id}/credits`, {
        params: { api_key: TMDB_KEY, language: "en-US" },
      }),
      axios.get(`${BASE_URL}/tv/${id}/watch/providers`, {
        params: { api_key: TMDB_KEY, language: "en-US" },
      }),
    ]);

    const providerData =
      providers.data.results?.IN?.flatrate ||
      providers.data.results?.US?.flatrate ||
      [];

    res.status(200).json({
      message: "Success getting tv series details",
      success: true,
      result: {
        ...details.data,
        credits: credits.data,
        streamingProviders: providerData, 
      },
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
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  getTrendingTodayTv,
  searchTv,
  getTvDetails,
};

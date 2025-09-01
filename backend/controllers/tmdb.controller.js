import axios from "axios";
import { TMDB_KEY, BASE_URL, handleError } from "../constants/constants.js";

// Search tv + movie
const searchMulti = async (req, res) => {
  try {
    const { q, page = 1 } = req.query;
    if (!q || q.trim() === "") {
      return res
        .status(400)
        .json({ message: "Query parameter q is required", success: false });
    }

    const response = await axios.get(`${BASE_URL}/search/multi`, {
      timeout: 5000,
      params: { api_key: TMDB_KEY, query: q, language: "en-US", page },
    });

    res.status(200).json({
      message: "Success getting movie or tv series",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export { searchMulti };

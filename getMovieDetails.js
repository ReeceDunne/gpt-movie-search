const axios = require("axios");
const moment = require("moment"); // require

const getMovieDetails = async (movieTitle) => {
  const omdbApiUrl = "http://www.omdbapi.com";
  const omdbApiKey = process.env.OMDB_API_KEY;

  const options = {
    method: "GET",
    url: omdbApiUrl,
    params: { t: movieTitle, apikey: omdbApiKey },
  };

  // Add map so can return results for multiple movies
  try {
    const response = await axios.request(options);

    // Function to get rating value by source, converting to decimal if it's Rotten Tomatoes
    function getRatingBySource(source) {
      const rating = response.data.Ratings.find((r) => r.Source === source);
      if (!rating) return null; // If the source is not found, return null

      if (source === "Rotten Tomatoes") {
        // Convert percentage to decimal
        return parseFloat(rating.Value.replace("%", "")) / 10; // 89% becomes 8.9
      } else {
        // For other sources, return the numeric part only
        return parseFloat(rating.Value.split("/")[0]);
      }
    }

    // Example usage
    const imdbRating = getRatingBySource("Internet Movie Database");
    // console.log("IMDb Rating:", imdbRating); // Outputs "9.3"

    const rottenTomatoesRating = getRatingBySource("Rotten Tomatoes");
    // console.log("Rotten Tomatoes Rating:", rottenTomatoesRating); // Outputs "89" as "8.9"

    // Calculate average score
    const averageScore =
      typeof imdbRating === "undefined" ||
      typeof rottenTomatoesRating === "undefined" ||
      imdbRating <= 0 ||
      rottenTomatoesRating <= 0
        ? null
        : (imdbRating + rottenTomatoesRating) / 2;

    console.log({
      title: response.data.Title,
      plot: response.data.Plot,
      maturity_rating: response.data.Rated,
      releaseDate:
        moment(response.data.Released, "DD MMM YYYY").format("DD-MM-YYYY") ||
        response.data.Released,
      runtime: response.data.Runtime,
      poster: response.data.Poster,
      scores: {
        imdb: !imdbRating ? null : imdbRating,
        rottenTomatoes: !rottenTomatoesRating ? null : rottenTomatoesRating,
        averagedScore:
          averageScore == null ? null : parseFloat(averageScore.toFixed(1)), // Rounded to one decimal
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getMovieDetails };

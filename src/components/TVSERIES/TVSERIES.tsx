import SEARCHICON from "/assets/svg_files/icon-search.svg";
import EMPTYBOOKMARKEDICON from "/assets/svg_files/icon-bookmark-empty.svg";
import PLAYICON from "/assets/svg_files/icon-play.svg";
import NAVMOVIESICON from "/assets/svg_files/icon-nav-movies.svg";
import FULLBOOKMARKEDICON from "/assets/svg_files/icon-bookmark-full.svg";
import "./tvSeries.css";
import { useEffect, useState } from "react";
import { useBookmarkContext } from "../BOOKMARKED/BookmarkContext";
import data from "../../data.json";

interface MovieRecommeded {
  isTrending: boolean;
  thumbnail: {
    regular: {
      small: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: number;
  title: string;
  isBookmarked: boolean;
}

export const TVSERIES = () => {
  const [moviesData, setMoviesData] = useState<MovieRecommeded[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MovieRecommeded[]>([]);
  const [sectionVisibility, setSectionVisibility] = useState<string>("all");

  useEffect(() => {
    // Fetch JSON data
    // fetch("src/data.json")
    //   .then((response) => response.json())
    //   .then((data) => setMoviesData(data))
    //   .catch((error) => console.error("Error fetching data:", error));
    
    function validateMovieRecommendedData(data: any): MovieRecommeded[] {
      // Your validation logic here, you might need to adjust this based on your data structure
      if (Array.isArray(data) && data.length > 0) {
        return data as MovieRecommeded[];
      } else {
        throw new Error('Invalid data format');
      }
    }
    
      setMoviesData(validateMovieRecommendedData(data))
  }, []); // Empty dependency array ensures the effect runs only once

  const [hoveredStates, setHoveredStates] = useState(
    Array(moviesData.length).fill(false)
  );

  const handleMouseEnter = (index: number) => {
    const updatedHoveredStates = [...hoveredStates];
    updatedHoveredStates[index] = true;
    setHoveredStates(updatedHoveredStates);
  };

  const handleMouseLeave = (index: number) => {
    const updatedHoveredStates = [...hoveredStates];
    updatedHoveredStates[index] = false;
    setHoveredStates(updatedHoveredStates);
  };

  //handling search results
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = event.currentTarget.value.trim().toLowerCase();
      setSearchQuery(query);

      // Filter movies based on the search query
      const results = moviesData.filter(
        (movie) =>
          movie.category === "TV Series" &&
          movie.title.toLowerCase().includes(query)
      );

      setSearchResults(results);
      setSectionVisibility("searchResults");
    }
  };

  //getting the toggleMark from the useContext
  const { toggleBookmark } = useBookmarkContext()

  //locally copying the contents of the isBookmarked contents
  const setisBookmarked = (movie : MovieRecommeded) => {
    setMoviesData((prevMoviesData) => {
      const updatedMoviesData = [...prevMoviesData];
      const updatedMovie = { ...movie, isBookmarked: !movie.isBookmarked };
      const movieIndex = updatedMoviesData.findIndex((m) => m.title === movie.title);
      updatedMoviesData[movieIndex] = updatedMovie;
      return updatedMoviesData;
    });
  }

  return (
    <>
      <div>
        <div className="search-container">
          {/* my search area */}
          <div className="searchArea">
            <img src={SEARCHICON} alt="the search icon" />
            <label htmlFor="searchResults">
              <input
                type="text"
                placeholder="Search for TV series"
                onKeyDown={handleSearch}
                id="searchResults"
              />
            </label>
          </div>
        </div>

        {/* Tv SERIES  container */}
        {sectionVisibility === "all" && (
          <>
            <div className="movies-container">
              {/* Tv SERIES container */}
              <div className="recommended-container">
                <h2>TV Series</h2>

                <div className="myRecommended-moviesContainer">
                  <div className="moviesRecommended">
                    {moviesData.map(
                      (movie, index) =>
                        movie.category === "TV Series" && (
                          <div
                            className="trending-movieContainer"
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                          >
                            {/* Use media queries for responsive thumbnails */}
                            <img
                              src={
                                window.innerWidth <= 768
                                  ? movie.thumbnail.regular.small
                                  : movie.thumbnail.regular.large
                              }
                              alt={movie.title}
                            />
                            <div className="bookMarkContainer">
                              <img
                                src={
                                  movie.isBookmarked
                                    ? FULLBOOKMARKEDICON
                                    : EMPTYBOOKMARKEDICON
                                }
                                alt="empty bookmarked"
                                className="emptyBookedIcon"
                                onClick={() => {
                                  toggleBookmark(movie);
                                  // Toggle isBookmarked locally
                                  setisBookmarked(movie);
                                }}
                              />
                            </div>
                            <div
                              className="play-container"
                              style={{
                                visibility: hoveredStates[index]
                                  ? "visible"
                                  : "hidden",
                              }}
                            >
                              <img src={PLAYICON} alt="play icon" />
                              <p className="play-text">Play</p>
                            </div>
                            <div className="movie-descriptionContainer">
                              <div className="content">
                                {movie.year} <div className="ovalDot"></div>{" "}
                                <img src={NAVMOVIESICON} alt="movie icon" />{" "}
                                {movie.category} <div className="ovalDot"></div>{" "}
                                {movie.rating}
                              </div>
                              <p className="movieTitle">{movie.title}</p>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {sectionVisibility === "searchResults" && (
          <div className="search-results-container">
            <h3>
              Found {searchResults.length} results for "{searchQuery}"
            </h3>

            {/* Rendering search results here */}
            <div className="searchResultsContainer">
              {searchResults.map((result, index) => (
                <div
                  className="trending-movieContainer"
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Use media queries for responsive thumbnails */}
                  <img
                    src={
                      window.innerWidth <= 768
                        ? result.thumbnail.regular.small
                        : result.thumbnail.regular.large
                    }
                    alt={result.title}
                  />
                  <div className="bookMarkContainer">
                    <img
                      src={
                        result.isBookmarked
                          ? FULLBOOKMARKEDICON
                          : EMPTYBOOKMARKEDICON
                      }
                      alt="empty bookmarked"
                      className="emptyBookedIcon"
                    />
                  </div>
                  <div
                    className="play-container"
                    style={{
                      visibility: hoveredStates[index] ? "visible" : "hidden",
                    }}
                  >
                    <img src={PLAYICON} alt="play icon" />
                    <p className="play-text">Play</p>
                  </div>
                  <div className="movie-descriptionContainer">
                    <div className="content">
                      {result.year} <div className="ovalDot"></div>{" "}
                      <img src={NAVMOVIESICON} alt="movie icon" />{" "}
                      {result.category} <div className="ovalDot"></div>{" "}
                      {result.rating}
                    </div>
                    <p className="movieTitle">{result.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// export default TVSERIES

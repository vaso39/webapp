import SEARCHICON from "/assets/svg_files/icon-search.svg";
import EMPTYBOOKMARKEDICON from "/assets/svg_files/icon-bookmark-empty.svg";
import PLAYICON from "/assets/svg_files/icon-play.svg";
import NAVMOVIESICON from "/assets/svg_files/icon-nav-movies.svg";
import FULLBOOKMARKEDICON from "/assets/svg_files/icon-bookmark-full.svg";
import "./homeStyles.css";
import { useState , useEffect } from "react";
import data from "../../data.json";

interface Movie {
  isTrending: boolean;
  thumbnail: {
    trending: {
      small: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: number;
  title: string;
}

export interface MovieRecommeded {
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

export const HOME = () => {
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [movieRecommended, setmovieRecommended] = useState<MovieRecommeded[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MovieRecommeded[]>([]);
  const [sectionVisibility, setSectionVisibility] = useState<string>("all");

  useEffect(() => {
    // Fetch JSON data and set both moviesData and movieRecommended
    // const fetchData = async () => {
    //   try {
    //     // Assuming that your data.json contains both trending and regular thumbnails
    //     await fetch("/src/data.json").
    //     then((response) => {
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }
    //       return response.json();
    //     }).then((obj) => {
    //         setMoviesData(obj);
    //         setmovieRecommended(obj);
    //     });
        
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    function validateMovieData(data: any): Movie[] {
      // Your validation logic here, you might need to adjust this based on your data structure
      if (Array.isArray(data) && data.length > 0) {
        return data as Movie[];
      } else {
        throw new Error('Invalid data format');
      }
    }

    function validateMovieRecommendedData(data: any ): MovieRecommeded[] {
      // Your validation logic here, you might need to adjust this based on your data structure
      if (Array.isArray(data) && data.length > 0) {
        return data as MovieRecommeded[];
      } else {
        throw new Error('Invalid data format');
      }
    }
    

    setMoviesData(validateMovieData(data));
    setmovieRecommended(validateMovieRecommendedData(data));

    // fetchData();
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
      const results = movieRecommended.filter((movie) =>
        movie.title.toLowerCase().includes(query)
      );

      setSearchResults(results);
      setSectionVisibility("searchResults");
    }
  };


  return (
    <>
      <div className="mainContainer">
        <div className="search-container">
          {/* my search area */}
          <div className="searchArea">
            <img src={SEARCHICON} alt="the search icon" />
            <label htmlFor="searchResults">
              <input
                type="text"
                placeholder="Search for movies or TV series"
                onKeyDown={handleSearch}
                id="searchResults"
              />
            </label>
          </div>
        </div>

        {/* trending container */}
        {sectionVisibility === "all" && (
          <>
            <div className="trending-container">
              <h1>Trending</h1>

              <div className="trending-movies-container">
                <div className="trending-movie">
                  {moviesData.map(
                    (movie, index) =>
                      movie.isTrending && (
                        <div
                          className="trending-movieContainer"
                          key={index}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={() => handleMouseLeave(index)}
                        >
                          {/* Use media queries for responsive thumbnails */}
                          <img
                            src={
                              
                              (window.innerWidth <= 768
                                ? movie.thumbnail.trending.small
                                : movie.thumbnail.trending.large)
                            }
                            alt={movie.title}
                          />
                          <div className="bookMarkContainer">
                            <img
                              src={EMPTYBOOKMARKEDICON}
                              alt="empty bookmarked"
                              className="emptyBookedIcon"
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
                          <div className="movie-description-container">
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

            <div className="recommended-container">
              <h2>Recommended for you</h2>

              <div className="myRecommended-moviesContainer">
                <div className="moviesRecommended">
                  {movieRecommended.map(
                    (movie, index) =>
                      !movie.isTrending && (
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

// export default HOME;

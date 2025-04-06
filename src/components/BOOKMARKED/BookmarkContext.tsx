import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { MovieRecommeded } from "../MOVIES/MOVIES";
import data from "../../data.json";

interface BookmarkContextProps {
  bookmarkedMovies: MovieRecommeded[];
  toggleBookmark: (movie: MovieRecommeded) => void;
}

interface childProps {
  children: ReactNode;
}

const BookmarkContext = createContext<BookmarkContextProps | undefined>(
  undefined
);

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error(
      "useBookmarkContext must be used within a BookmarkProvider"
    );
  }
  return context;
};

export const BookmarkProvider = ({ children }: childProps) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<MovieRecommeded[]>(
    []
  );

  const toggleBookmark = (movie: MovieRecommeded) => {
    setBookmarkedMovies((prevBookmarkedMovies) => {
      const isMovieBookmarked = prevBookmarkedMovies.some(
        (m) => m.title === movie.title && m.isBookmarked === true
      );

      if (isMovieBookmarked) {
        console.log("Removing bookmark for:", movie.title);
        // If the movie is already bookmarked, remove it
        return prevBookmarkedMovies.filter((m) => m.title !== movie.title);
      } else {
        console.log("Adding bookmark for:", movie.title);
        // If the movie is not bookmarked, add it
        return [
          ...prevBookmarkedMovies,
          {
            ...movie,
            isBookmarked: true,
          },
        ];
      }
    });
  };

  useEffect(() => {
    // Fetch JSON data
    // fetch("src/data.json")
    // .then((response) => response.json())
    // .then((data) => setBookmarkedMovies(data))
    //     .catch((error) => console.error("Error fetching data:", error));
    // const moviedata:MovieRecommeded[] = data

    function validateMovieRecommendedData(data: any): MovieRecommeded[] {
      // Your validation logic here, you might need to adjust this based on your data structure
      if (Array.isArray(data) && data.length > 0) {
        return data as MovieRecommeded[];
      } else {
        throw new Error("Invalid data format");
      }
    }
    setBookmarkedMovies(validateMovieRecommendedData(data));
  }, []); // Empty dependency array ensures the effect runs only once

  console.log(bookmarkedMovies);

  return (
    <BookmarkContext.Provider value={{ bookmarkedMovies, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

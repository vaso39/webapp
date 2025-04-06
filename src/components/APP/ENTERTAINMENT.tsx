import NAVMOVIESICON from "../../../public/assets/svg_files/icon-nav-movies.svg";
import NAVTVSERIES from "../../../public/assets/svg_files/icon-nav-tv-series.svg";
import NAVBOOKMARKEDICON from "../../../public/assets/svg_files/icon-nav-bookmark.svg";
import NAVHOMEICON from "../../../public/assets/svg_files/icon-nav-home.svg";
import ENTERTAINMENTICON from "../../../public/assets/svg_files/logo.svg";
import AVATARICON from "../../../public/assets/svg_files/image-avatar.png";
import { TVSERIES } from "../TVSERIES/TVSERIES";
import { HOME } from "../HOME/HOME";
import { MOVIES } from "../MOVIES/MOVIES";
import { BOOKMARKED } from "../BOOKMARKED/BOOKMARKED";
import { useState, useEffect } from "react";
import "../EntertainmentStyles/entertainmentStyles.css";
import { BookmarkProvider } from "../BOOKMARKED/BookmarkContext";

export const ENTERTAINMENT = () => {
  //list of navicons
  const [activeComponent, setActiveComponent] = useState("HOME");

  const navList = [
    { icon: NAVHOMEICON, component: "HOME" },
    { icon: NAVMOVIESICON, component: "MOVIES" },
    { icon: NAVTVSERIES, component: "TVSERIES" },
    { icon: NAVBOOKMARKEDICON, component: "BOOKMARKED" },
  ];

  const handleNavClick = (component: string) => {
    setActiveComponent(component);
  };

  const activeIcon = {
    filter: "invert(0) brightness(100)",
    transition: "all 0.5s",
  };
  const unactiveIcon = {
    filter: "",
  };


  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading completion after a delay
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // You can adjust the delay as needed

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <>
      <div className={`main-container ${isLoading ? 'loading' : ''}`}>
        
        {/* <!-- preloader for contents/ seearch results --> */}
        {isLoading && (
          <div className="preloader-container">
            <div className="wrap">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
          </div>
        )}

        <div className="navContainer">
          <header>
            <img src={ENTERTAINMENTICON} alt="logo" />
          </header>
          <nav className="myNavlist">
            {navList.map((item, index) => (
              <div key={index} onClick={() => handleNavClick(item.component)}>
                <img
                  src={item.icon}
                  alt="nav list icons"
                  style={
                    activeComponent === item.component
                      ? activeIcon
                      : unactiveIcon
                  }
                />
              </div>
            ))}
          </nav>
          <div className="imageContainer">
            <img src={AVATARICON} alt="avatar image of the persons icon" />
          </div>
        </div>

        <BookmarkProvider>
          <div className="entertainmentSection">
            {activeComponent === "HOME" && <HOME />}
            {activeComponent === "MOVIES" && <MOVIES />}
            {activeComponent === "TVSERIES" && <TVSERIES />}
            {activeComponent === "BOOKMARKED" && <BOOKMARKED />}
          </div>
        </BookmarkProvider>
      </div>
    </>
  );
};


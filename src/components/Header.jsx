import React from "react";

const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <header className="header">
      <b className="tagline">Where in the world?</b>
      <button className="mode-btn" onClick={toggleTheme}>
        <img
          src={
            isDarkMode
              ? "https://cdn-icons-png.flaticon.com/256/899/899724.png" // Light icon
              : "https://cdn-icons-png.flaticon.com/128/4623/4623236.png" // Dark icon
          }
          alt="theme icon"
        />
        <span className="mode-text">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
      </button>
    </header>
  );
};

export default Header;

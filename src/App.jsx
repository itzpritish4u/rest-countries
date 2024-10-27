import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../src/components/Header";
import Filter from "../src/components/Filter";
import Countries from "../src/components/Countries";
import CountryDetail from "../src/components/CountryDetail";
import "./App.css";

const url = "https://restcountries.com/v3.1/all";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [countries, setCountries] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const regionSubregionMap = {
    Americas: ["Caribbean", "North America", "South America", "Central America"],
    Europe: ["Western Europe", "Central Europe", "Southern Europe", "Southeast Europe", "Northern Europe", "Eastern Europe"],
    Africa: ["Western Africa", "Northern Africa", "Eastern Africa", "Southern Africa", "Middle Africa"],
    Asia: ["Eastern Asia", "South-Eastern Asia", "Western Asia", "Central Asia", "Southern Asia"],
    Oceania: ["Melanesia", "Micronesia", "Polynesia", "Australia and New Zealand"],
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const filteredCountries = countries
    .filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
      const matchesSubregion = selectedSubregion ? country.subregion === selectedSubregion : true;
      return matchesSearch && matchesRegion && matchesSubregion;
    })
    .sort((a, b) => {
      if (sortBy === "ascendingPopulation") return a.population - b.population;
      if (sortBy === "descendingPopulation") return b.population - a.population;
      if (sortBy === "ascendingArea") return a.area - b.area;
      if (sortBy === "descendingArea") return b.area - a.area;
      return 0;
    });

  return (
    <Router>
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Filter 
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedRegion={selectedRegion}
                  onRegionChange={(region) => {
                    setSelectedRegion(region);
                    setSelectedSubregion("");
                  }}
                  selectedSubregion={selectedSubregion}
                  subregions={regionSubregionMap[selectedRegion] || []}
                  onSubregionChange={setSelectedSubregion}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
                <Countries countries={filteredCountries} />
              </>
            } 
          />
          <Route path="/countries/:countryCode" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

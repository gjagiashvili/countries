import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      console.log("Country", res.data);
      setCountries(res.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const filteredByRegion = selectedRegion
    ? filteredCountries.filter((country) =>
        country.region.toLowerCase().includes(selectedRegion.toLowerCase())
      )
    : filteredCountries;

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="header">
        <h1>Where in the world?</h1>
        <button onClick={toggleDarkMode} className="dark-mode-button">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          className="region-dropdown"
        >
          <option value="" disabled>
            Filter by region
          </option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="countries-list">
        {filteredByRegion.length > 0 ? (
          filteredByRegion.map((country, index) => (
            <Country key={index} country={country} />
          ))
        ) : (
          <p style={{ color: "red" }}>No Country Found</p>
        )}
      </div>
    </div>
  );
}

export default App;

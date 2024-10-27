import React from "react";

function Filter({
  searchTerm,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  selectedSubregion,
  subregions,
  onSubregionChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="filter">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Region Dropdown */}
      <select
        className="select"
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
      >
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      {/* Subregion Dropdown */}
      <select
        className="select"
        value={selectedSubregion}
        onChange={(e) => onSubregionChange(e.target.value)}
      >
        <option value="">Filter by Subregion</option>
        {subregions.map((subregion) => (
          <option key={subregion} value={subregion}>
            {subregion}
          </option>
        ))}
      </select>

      {/* Sort Dropdown */}
      <select
        className="select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="ascendingPopulation">Population: Low to High</option>
        <option value="descendingPopulation">Population: High to Low</option>
        <option value="ascendingArea">Area: Low to High</option>
        <option value="descendingArea">Area: High to Low</option>
      </select>
    </div>
  );
}

export default Filter;

import React, { ReactElement, useState } from 'react';

interface SearchBarProps {
  onSearch: (location: { lat: number; lng: number }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }): ReactElement => {
  const [searchText, setSearchText] = useState('');

  const handleSearchClick = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchText
        )}&key=AIzaSyBF_7sgUJ9Wr5EvuEu-scZRF2YgQ0v8bqk`
      );
      if (!response.ok) {
        console.error('Failed to fetch geolocation data.');
      }
      const data = await response.json();
      console.log('Geocoding API response:', data);
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry?.location;
        if (location) {
          onSearch(location);
        } else {
          console.error(
            'Geocoding API response does not contain location data.'
          );
        }
      } else {
        console.error('Geocoding API response contains no results.');
      }
    } catch (error) {
      console.error('Error searching for the location:', error);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Address or place"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;

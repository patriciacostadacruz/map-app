import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiKey, apiBaseLink } from '../data/credentials';

interface SearchBarProps {
  onSearch: (location: { lat: number; lng: number }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }): ReactElement => {
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | number | boolean>(
    ''
  );
  const navigate = useNavigate();

  const handleSearchClick = async () => {
    try {
      const response = await fetch(
        `${apiBaseLink}${encodeURIComponent(searchText)}&key=${apiKey}`
      );
      if (!response.ok) {
        setErrorMessage('Failed to fetch geolocation data.');
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry?.location;
        if (location) {
          setErrorMessage('');
          onSearch(location);
          navigate('/map');
        } else {
          setErrorMessage(
            'Geocoding API response does not contain location data.'
          );
        }
      } else {
        setErrorMessage('Geocoding API response contains no results.');
      }
    } catch (error) {
      setErrorMessage(
        'An error occured when searching for the location. Please try again.'
      );
      console.error('Error when searching location:', error);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-line">
        <input
          className="search-bar"
          type="text"
          placeholder="Type the address you're looking for here"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SearchBar;

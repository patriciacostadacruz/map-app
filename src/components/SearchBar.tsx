import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiKey, apiBaseLink } from '../data/credentials';

interface SearchBarProps {
  onSearch: (
    location: { lat: number; lng: number },
    searchString: string
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }): ReactElement => {
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  // using Promise<void> as this is gonna be an async function which does not return anything we need
  const handleSearchClick = async (): Promise<void> => {
    if (!searchText.trim()) {
      setErrorMessage('Please type a valid address/city.');
      return;
    }
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
          onSearch(location, searchText);
          navigate('/map');
          setSearchText('');
        } else {
          setErrorMessage(
            'We cannot locate this for you. Make sure to type a valid address/city.'
          );
        }
      } else {
        setErrorMessage(
          'We cannot retrieve this for you. Make sure to type a valid address/city.'
        );
      }
    } catch (error) {
      setErrorMessage(
        'An error occurred when searching for the location. Please try again.'
      );
      console.error('Error when searching location:', error);
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      handleSearchClick();
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
          onKeyPress={handleKeyPress}
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

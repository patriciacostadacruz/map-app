import React, { ReactElement, useState } from 'react';

interface SearchHistoryProps {
  searchHistory: string[];
}

const capitalizeFirstLetter = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
}): ReactElement => {
  const [showAll, setShowAll] = useState(false);

  // used to display either 6 last researches - either all
  const displayedSearches = showAll
    ? searchHistory.slice().reverse()
    : searchHistory.slice(-6).reverse();

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div className="history-container">
      <h3>Last searched</h3>
      {!showAll && searchHistory.length > 6 && (
        <button className="history-button" onClick={handleShowAll}>
          Show all
        </button>
      )}
      {showAll && (
        <button className="history-button" onClick={handleShowLess}>
          Show less
        </button>
      )}
      <ul>
        {displayedSearches.length > 0 ? (
          displayedSearches.map((searchString, index) => (
            <li key={index}>{capitalizeFirstLetter(searchString)}</li>
          ))
        ) : (
          <p>No recent searches.</p>
        )}
      </ul>
    </div>
  );
};

export default SearchHistory;

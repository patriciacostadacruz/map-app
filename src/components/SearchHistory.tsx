import React, { ReactElement, useState } from 'react';

interface SearchHistoryProps {
  searchHistory: string[];
}

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
    <div>
      <h3>Last searched</h3>
      <ul>
        {displayedSearches.length > 0 ? (
          displayedSearches.map((searchString, index) => (
            <li key={index}>{searchString}</li>
          ))
        ) : (
          <p>No recent searches.</p>
        )}
      </ul>
      {!showAll && searchHistory.length > 6 && (
        <button onClick={handleShowAll}>Show all</button>
      )}
      {showAll && <button onClick={handleShowLess}>Show less</button>}
    </div>
  );
};

export default SearchHistory;

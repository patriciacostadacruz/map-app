import React, { ReactElement } from 'react';

interface SearchHistoryProps {
  searchHistory: string[];
  updateSearchHistory: (history: string[]) => void;
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
  updateSearchHistory,
}): ReactElement => {
  const [showAll, setShowAll] = React.useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  const handleDeleteEntry = (originalIndex: number) => {
    const updatedHistory = searchHistory.filter(
      (_, index) => index !== originalIndex
    );
    updateSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  // calculates the displayed entries index after the deletion - needed to delete the correct item when not all the history is displayed
  const displayedSearches = showAll
    ? searchHistory
        .map((searchString, index) => ({ searchString, originalIndex: index }))
        .reverse()
    : searchHistory
        .slice(-6)
        .map((searchString, index) => ({
          searchString,
          originalIndex: searchHistory.length - 6 + index,
        }))
        .reverse();

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
          displayedSearches.map(({ searchString, originalIndex }) => (
            <li key={originalIndex}>
              {capitalizeFirstLetter(searchString)}{' '}
              <button
                className="delete-button"
                onClick={() => handleDeleteEntry(originalIndex)}
              >
                X
              </button>
            </li>
          ))
        ) : (
          <p>No recent searches.</p>
        )}
      </ul>
    </div>
  );
};

export default SearchHistory;

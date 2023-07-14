import { ReactElement } from 'react';

export default function SearchBar(): ReactElement {
  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Address or place"
      />
      <button className="search-button">Search</button>
    </div>
  );
}

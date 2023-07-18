import React, { ReactElement } from 'react';
import SearchBar from '../components/SearchBar';

const MainPage: React.FC = (): ReactElement => {
  const handleSearch = (location: { lat: number; lng: number }) => {
    console.info('Location:', location);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default MainPage;

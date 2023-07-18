import React, { ReactElement, useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { apiKey } from '../data/credentials';

const Map: React.FC = (): ReactElement => {
  const defaultLocation = { lat: 41.3851, lng: 2.1734 };

  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(defaultLocation);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(defaultLocation);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const mapStyle = {
    height: '400px',
    width: '90%',
    margin: 'auto',
  };

  const handleSearch = async (
    location: { lat: number; lng: number },
    searchString: string
  ) => {
    setMapCenter(location);
    setMarkerPosition(location);
    // prevents duplicates in history
    if (searchHistory.includes(searchString)) {
      const updatedSearchHistory = searchHistory.filter(
        (item) => item !== searchString
      );
      updatedSearchHistory.push(searchString);
      setSearchHistory(updatedSearchHistory);
      localStorage.setItem(
        'searchHistory',
        JSON.stringify(updatedSearchHistory)
      );
    } else {
      const updatedSearchHistory = [...searchHistory, searchString];
      setSearchHistory(updatedSearchHistory);
      localStorage.setItem(
        'searchHistory',
        JSON.stringify(updatedSearchHistory)
      );
    }
  };

  useEffect(() => {
    const storedSearchHistory = JSON.parse(
      localStorage.getItem('searchHistory') || '[]'
    );
    setSearchHistory(storedSearchHistory);
  }, []);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {mapCenter && markerPosition && (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={mapStyle} zoom={14} center={mapCenter}>
            {markerPosition.lat !== defaultLocation.lat ||
            markerPosition.lng !== defaultLocation.lng ? (
              <Marker position={markerPosition} />
            ) : null}
          </GoogleMap>
        </LoadScript>
      )}
      <hr />
      <SearchHistory
        searchHistory={searchHistory}
        updateSearchHistory={setSearchHistory}
      />
    </>
  );
};

export default Map;

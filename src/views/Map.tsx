import React, { ReactElement, useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { apiKey } from '../data/credentials';

const Map: React.FC = (): ReactElement => {
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searched, setSearched] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedSearchHistory = JSON.parse(
      localStorage.getItem('searchHistory') || '[]'
    );
    setSearchHistory(storedSearchHistory);
  }, []);

  const mapStyle = {
    height: '400px',
    margin: '50px',
  };

  const handleSearch = async (
    location: { lat: number; lng: number },
    searchString: string
  ) => {
    setMapCenter(location);
    setMarkerPosition(location);
    setSearched(true);
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

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {searched && mapCenter && markerPosition ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={mapStyle} zoom={14} center={mapCenter}>
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </LoadScript>
      ) : (
        <h4>The map will show as soon as you search for an address.</h4>
      )}
      <SearchHistory searchHistory={searchHistory} />
    </>
  );
};

export default Map;

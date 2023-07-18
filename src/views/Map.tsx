import React, { ReactElement, useState } from 'react';
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

  const mapStyle = {
    height: '400px',
    margin: '50px',
  };

  const handleSearch = async (location: { lat: number; lng: number }) => {
    setMapCenter(location);
    setMarkerPosition(location);
    setSearched(true);
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
      <SearchHistory />
    </>
  );
};

export default Map;

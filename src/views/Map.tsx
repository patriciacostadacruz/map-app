import React, { ReactElement, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map: React.FC = (): ReactElement => {
  // Barcelona
  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  const mapStyle = {
    height: '400px',
    margin: '50px',
  };

  const handleSearch = (location: { lat: number; lng: number }) => {
    setMapCenter(location);
    setMarkerPosition(location);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <LoadScript googleMapsApiKey="AIzaSyBF_7sgUJ9Wr5EvuEu-scZRF2YgQ0v8bqk">
        <GoogleMap mapContainerStyle={mapStyle} zoom={13} center={mapCenter}>
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
      <SearchHistory />
    </>
  );
};

export default Map;

import { ReactElement } from 'react';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

export default function Map(): ReactElement {
  const mapStyle = {
    height: '400px',
    margin: '50px',
  };

  // Barcelona location
  const center = {
    lat: 41.3851,
    lng: 2.1734,
  };

  return (
    <>
      <SearchBar />
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapStyle}
          zoom={13}
          center={center}
        ></GoogleMap>
      </LoadScript>
      <SearchHistory />
    </>
  );
}

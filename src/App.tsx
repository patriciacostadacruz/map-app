import { ReactElement } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './views/MainPage';
import ErrorPage from './views/ErrorPage';
import Map from './views/Map';

export default function App(): ReactElement {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

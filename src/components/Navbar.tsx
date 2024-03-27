import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import mapPng from '../images/map.png';

const Navbar: React.FC = (): ReactElement => {
  return (
    <div>
      <Link to="/">
        <img className="app-logo" src={mapPng} alt="logo" />
      </Link>
    </div>
  );
};

export default Navbar;

import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = (): ReactElement => {
  return (
    <div>
      <h3>This app allows you to search for addresses inside Google Maps.</h3>
      <Link to="/map">
        <button className="search-button-home">Start browsing</button>
      </Link>
    </div>
  );
};

export default MainPage;

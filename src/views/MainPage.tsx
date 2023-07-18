import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = (): ReactElement => {
  return (
    <div>
      <Link to="/map">
        <button className="search-button-home">
          Search for an address here
        </button>
      </Link>
    </div>
  );
};

export default MainPage;

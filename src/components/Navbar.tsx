import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import brickbroLogo from '../images/brickbro-logo.png';

export default function Navbar(): ReactElement {
  return (
    <div>
      <Link to="/">
        <img className="app-logo" src={brickbroLogo} alt="logo" />
      </Link>
    </div>
  );
}

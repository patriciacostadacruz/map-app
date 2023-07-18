import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = (): ReactElement => {
  return (
    <div>
      Oops, this page does not exist. <Link to="/">Back home</Link>
    </div>
  );
};

export default ErrorPage;

import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage(): ReactElement {
  return (
    <div>
      Oops, this page does not exist. <Link to="/">Back home</Link>
    </div>
  );
}

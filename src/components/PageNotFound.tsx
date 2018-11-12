import * as React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <h2>404 Page Not Found</h2>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
}

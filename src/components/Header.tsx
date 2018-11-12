import * as React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <div className="header">
      <Link to="/">Arc</Link>
      {'  |  '}
      <Link to="/cubic">Cubic Bezier</Link>
      {'  |  '}
      <Link to="/quadratic">Quadratic Bezier</Link>
      {'  |  '}
      <Link to="/about">About</Link>
    </div>
  );
}

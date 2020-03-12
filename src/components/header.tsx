import * as React from 'react';
import { Link } from 'react-router-dom';
import { homeUrl } from '../routes';

export const Header = () => {
  return (
    <header className="bg-teal-500 text-gray-100 shadow-lg w-full fixed top-0">
      <div className="mx-auto max-w-6xl px-3 py-2 flex justify-between items-center">
        <Link to={homeUrl} className="text-2xl">
          Bid It
        </Link>
      </div>
    </header>
  );
};

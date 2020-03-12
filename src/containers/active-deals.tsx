import * as React from 'react';
import { Link } from 'react-router-dom';
import { getDealUrl } from '../routes';
import { useActiveDeals } from '../services/deal.service';

export const ActiveDeals = () => {
  const { data: deals } = useActiveDeals();

  return (
    <div className="max-w-lg mx-auto px-3 py-4">
      {deals ? (
        <ul>
          {deals.map(deal => (
            <li key={deal._id} className="py-2 border-b border-gray-300">
              <Link to={getDealUrl(deal._id)} className="block">
                <strong>{deal.name}</strong>
                <div>
                  Current: {deal.currentBid ? deal.currentBid.currentPrice : deal.startingPrice}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

import * as React from 'react';
import { getActiveDeals } from '../services/deal.service';
import { DealData } from '../type';

export const ActiveDeals = () => {
  const [deals, setDeals] = React.useState<DealData[]>([]);

  React.useEffect(() => {
    getActiveDeals().then(setDeals);
  }, []);

  return (
    <div className="max-w-lg mx-auto px-3 py-4">
      <ul>
        {deals.map(deal => (
          <li key={deal._id} className="py-2 border-b border-gray-300">
            <p>
              <strong>{deal.name}</strong>
              <div>
                Current: {deal.currentBid ? deal.currentBid.currentPrice : deal.startingPrice}
              </div>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

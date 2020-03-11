import * as React from 'react';
import { getActiveDeals } from '../services/deal.service';
import { DealData } from '../type';

export const ActiveDeals = () => {
  const [deals, setDeals] = React.useState<DealData[]>([]);

  React.useEffect(() => {
    getActiveDeals().then(setDeals);
  }, []);

  return (
    <ul>
      {deals.map(deal => (
        <li key={deal._id}>
          <p>
            <strong>{deal.name}</strong>
          </p>
        </li>
      ))}
    </ul>
  );
};

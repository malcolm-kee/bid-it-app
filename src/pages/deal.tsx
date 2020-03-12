import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useDeal, useDealBidEvent } from '../services/deal.service';
import { CastDealForm } from '../containers/cast-deal-form';

export const Deal = () => {
  const params = useParams<{ dealId: string }>();

  const { data } = useDeal(params.dealId);
  const [currentPrice, setCurrentPrice] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (data) {
      setCurrentPrice(data.currentBid ? data.currentBid.currentPrice : data.startingPrice);
    }
  }, [data]);

  useDealBidEvent(params.dealId, ev => {
    if (ev.type === 'bid_accepted') {
      setCurrentPrice(ev.payload.price);
    }
  });

  return (
    <div className="bg-white max-w-2xl mx-auto px-4 py-2">
      {!data && <p>Loading...</p>}
      {data && (
        <>
          <h1 className="text-3xl md:text-5xl text-gray-700">{data.name}</h1>
          {currentPrice && (
            <>
              <p className="text-xl">Current Price: {currentPrice.toLocaleString()}</p>
              <CastDealForm dealId={params.dealId} minBid={currentPrice} />
            </>
          )}
        </>
      )}
    </div>
  );
};

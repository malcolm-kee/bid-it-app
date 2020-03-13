import * as React from 'react';
import { useParams } from 'react-router-dom';
import { CastDealForm } from '../containers/cast-deal-form';
import { formatDate } from '../lib/format-date';
import { formatMoney } from '../lib/format-money';
import { isNotNil } from '../lib/type-check';
import { useDeal, useDealBidEvent } from '../services/deal.service';

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
          <h1 className="text-3xl md:text-5xl text-gray-700 text-center">{data.name}</h1>
          <div className="mb-4 text-center">Will be closed at {formatDate(data.closedAt)}</div>
          {/* TODO: Countdown Clock */}
          {isNotNil(currentPrice) && (
            <>
              <div className="text-center my-10">
                <div>
                  <small className="text-lg">Highest Bid:</small>
                </div>
                <p className="text-3xl">{formatMoney(currentPrice)}</p>
              </div>
              <div className="my-5">
                <div className="rounded-md px-3 pt-2 shadow-lg border-t-2 border-teal-500">
                  <CastDealForm dealId={params.dealId} minBid={currentPrice} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

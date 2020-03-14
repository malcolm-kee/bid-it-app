import * as React from 'react';
import { useParams } from 'react-router-dom';
import { CastDealForm } from '../containers/cast-deal-form';
import { formatDate } from '../lib/format-date';
import { formatMoney } from '../lib/format-money';
import { isNotNil } from '../lib/type-check';
import { useDeal, useDealBidEvent } from '../services/deal.service';
import { DealData } from '../type';
import { CountDown } from '../components/count-down';

export const Deal = () => {
  const params = useParams<{ dealId: string }>();

  const { data, mutate } = useDeal(params.dealId);

  return (
    <div className="bg-white max-w-2xl mx-auto px-4 py-2">
      {!data && <p>Loading...</p>}
      {data &&
        (data.closed ? <ClosedDeal deal={data} /> : <ActiveDeal deal={data} mutate={mutate} />)}
    </div>
  );
};

const ActiveDeal = (props: {
  deal: DealData;
  mutate: (latestDeal: DealData) => Promise<unknown>;
}) => {
  const { deal } = props;

  const [currentPrice, setCurrentPrice] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (deal) {
      setCurrentPrice(deal.currentBid ? deal.currentBid.currentPrice : deal.startingPrice);
    }
  }, [deal]);

  useDealBidEvent(deal._id, ev => {
    if (ev.type === 'bid_accepted' && (!currentPrice || ev.payload.price > currentPrice)) {
      setCurrentPrice(ev.payload.price);
    }
    if (ev.type === 'bid_closed' && deal) {
      props.mutate({
        ...deal,
        closed: true,
      });
    }
  });

  return (
    <>
      <h1 className="text-3xl md:text-5xl text-gray-700 text-center">{deal.name}</h1>
      <div className="mb-4 text-center">Will be closed at {formatDate(deal.closedAt)}</div>
      <CountDown
        className="mx-auto max-w-sm text-center text-2xl"
        endTime={new Date(deal.closedAt)}
      />
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
              <CastDealForm dealId={deal._id} minBid={currentPrice} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

const ClosedDeal = (props: { deal: DealData }) => {
  return (
    <>
      <h1 className="text-3xl md:text-5xl text-gray-700 text-center">{props.deal.name}</h1>
      <div className="mb-4 text-center">Closed at {formatDate(props.deal.closedAt)}</div>
      {props.deal.currentBid ? (
        <div className="text-center my-10">
          <div>
            <small className="text-lg">Highest Bid:</small>
          </div>
          <p className="text-3xl">{formatMoney(props.deal.currentBid.currentPrice)}</p>
        </div>
      ) : (
        <div className="text-center my-10">
          <p>There is no bid for this deal.</p>
        </div>
      )}
    </>
  );
};

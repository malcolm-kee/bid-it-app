import useSwr from 'swr';
import { useSocket } from '../hooks/use-socket';
import { fetchJson } from '../lib/fetch-json';
import { DealData } from '../type';

const dealApiUrl = process.env.REACT_APP_ACTIVE_DEALS_URL as string;

export const getActiveDeals = (): Promise<DealData[]> => fetchJson(dealApiUrl);

export const useActiveDeals = () => useSwr<DealData[]>(dealApiUrl, fetchJson);

export const useDeal = (dealId: string) => {
  return useSwr<DealData>(dealApiUrl + `/${dealId}`, fetchJson);
};

type DealSocketEvent =
  | {
      type: 'bid_rejected' | 'bid_accepted';
      payload: {
        bidId: string;
        dealId: string;
        dealerId: string;
        price: number;
      };
    }
  | {
      type: 'bid_closed';
      payload: {
        bidId: string;
        details: DealData;
      };
    };

export const useDealBidEvent = (dealId: string, onEvent: (event: DealSocketEvent) => void) =>
  useSocket((process.env.REACT_APP_ACTIVE_DEAL_SOCKET_URL as string) + `?dealId=${dealId}`, {
    onMessage: onEvent,
  });

type BidData = {
  dealId: string;
  dealerId: string;
  price: number;
};

export const placeBid = (bid: BidData): Promise<{ bidId: string }> =>
  fetchJson(dealApiUrl, {
    method: 'PUT',
    body: JSON.stringify(bid),
  });

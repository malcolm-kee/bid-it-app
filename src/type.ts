export type DealData = {
  _id: string;
  name: string;
  startingPrice: number;
  startedAt: string;
  closedAt: string;
  closed: boolean;
  currentBid?: {
    currentPrice: number;
    currentDealerId: string;
  };
};

export type UserData = {
  name: string;
  email: string;
  _id: string;
};

export type UiStatus = 'idle' | 'busy' | 'error';

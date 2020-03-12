import fetch from 'unfetch';
import { DealData } from '../type';

export const getActiveDeals = (): Promise<DealData[]> =>
  fetch(process.env.REACT_APP_ACTIVE_DEALS_URL as string).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Fetch error');
  });

import fetch from 'unfetch';
import { DealData } from '../type';

export const getActiveDeals = (): Promise<DealData[]> =>
  fetch('http://localhost:3000/deal').then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Fetch error');
  });

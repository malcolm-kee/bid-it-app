import { fetchJson } from '../lib/fetch-json';
import { UserData } from '../type';

const authStorageKey = 'bid_auth';

export const getCurrentUser = (): UserData | null => {
  const storedUser = window.localStorage.getItem(authStorageKey);

  return storedUser === null ? null : JSON.parse(storedUser);
};

export const register = (user: Omit<UserData, '_id'>): Promise<UserData> =>
  fetchJson(process.env.REACT_APP_REGISTER_URL as string, {
    method: 'POST',
    body: JSON.stringify(user),
  }).then(user => {
    if (user) {
      window.localStorage.setItem(authStorageKey, JSON.stringify(user));
    }
    return user;
  });

export const login = (email: string): Promise<UserData> =>
  fetchJson(process.env.REACT_APP_LOGIN_URL as string, {
    method: 'POST',
    body: JSON.stringify({ email }),
  }).then(user => {
    if (user) {
      window.localStorage.setItem(authStorageKey, JSON.stringify(user));
    }
    return user;
  });

export const logout = () => window.localStorage.removeItem(authStorageKey);

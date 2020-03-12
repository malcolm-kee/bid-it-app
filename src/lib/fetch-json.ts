import fetch from 'unfetch';

export const fetchJson = (
  requestUrl: string,
  { method, headers, body, ...init }: RequestInit = {}
) => {
  return fetch(requestUrl, {
    method,
    headers: {
      ...(body
        ? {
            'Content-Type': 'application/json',
          }
        : {}),
      ...headers,
    },
    body,
    ...init,
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Fetch error');
  });
};

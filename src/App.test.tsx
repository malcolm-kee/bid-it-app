import add from 'date-fns/add';
import React from 'react';
import xhrMock from 'xhr-mock';
import App from './App';
import { renderWithRouter } from './test-helper';

beforeEach(() => {
  xhrMock.setup();
});

afterEach(() => {
  xhrMock.teardown();
});

test(`shows home page`, async () => {
  const mockDeals = [
    {
      _id: 'id',
      name: 'Sample Deal',
      startingPrice: 1000,
      startedAt: new Date().toLocaleString(),
      closedAt: add(new Date(), {
        days: 2,
      }).toLocaleString(),
      closed: false,
    },
  ];

  xhrMock.get('http://localhost:3000/deal', {
    status: 201,
    body: JSON.stringify(mockDeals),
  });

  const { findByText } = renderWithRouter(<App />);

  const deal = await findByText(mockDeals[0].name);

  expect(deal).toBeVisible();
});

test(`shows not found page with invalid URL`, async () => {
  const { getByText } = renderWithRouter(<App />, {
    initialRoute: '/outdated-link',
  });

  expect(getByText('Page Not Found')).toBeVisible();
});

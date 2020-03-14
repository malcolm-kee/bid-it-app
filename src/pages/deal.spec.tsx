import { act } from '@testing-library/react';
import add from 'date-fns/add';
import WS from 'jest-websocket-mock';
import * as React from 'react';
import { Route } from 'react-router-dom';
import xhrMock from 'xhr-mock';
import { AuthProvider } from '../data/auth.data';
import { renderWithRouter, user } from '../test-helper';
import { Deal } from './deal';

function setup() {
  return renderWithRouter(
    <AuthProvider>
      <Route path="/deal/:dealId" component={Deal} />
    </AuthProvider>,
    {
      initialRoute: '/deal/dealId',
    }
  );
}

function createMockDeal() {
  return {
    _id: 'id',
    name: 'Deal Name',
    startingPrice: 1000,
    closed: false,
    startedAt: new Date().toLocaleString(),
    closedAt: add(new Date(), {
      days: 2,
    }).toLocaleString(),
  };
}

describe(`Deal page`, () => {
  beforeEach(() => {
    xhrMock.setup();
    window.localStorage.clear();
  });

  afterEach(() => {
    xhrMock.teardown();
    WS.clean();
  });

  test(`show the deal details`, async () => {
    const mockDeal = createMockDeal();

    xhrMock.get('http://localhost:3000/deal/dealId', {
      status: 201,
      body: JSON.stringify(mockDeal),
    });

    const { findByText } = setup();

    const dealName = await findByText(mockDeal.name);

    expect(dealName).toBeVisible();
  });

  test(`allows to login and cast bid`, async () => {
    const mockDeal = createMockDeal();

    xhrMock
      .get('http://localhost:3000/deal/dealId', {
        status: 201,
        body: JSON.stringify(mockDeal),
      })
      .post('http://localhost:3000/register', (req, res) => {
        const body = JSON.parse(req.body());

        return res.status(201).body(
          JSON.stringify({
            ...body,
            _id: 'userId',
          })
        );
      })
      .put('http://localhost:3000/deal', (_, res) =>
        res.status(201).body(
          JSON.stringify({
            bidId: 'bidId',
          })
        )
      );

    const { findByText, getByText, findByLabelText, getByLabelText } = setup();

    await findByText('Login first to place cast.');

    user.click(getByText('Sign up'));

    await user.type(getByLabelText('Email'), 'malcolm@gmail.com');
    await user.type(getByLabelText('Name'), 'Malcolm Kee');

    user.click(getByText('Signup'));

    const bidAmount = await findByLabelText('Bid Amount');

    await user.type(bidAmount, `${mockDeal.startingPrice + 200}`);

    user.click(getByText('Place Bid'));
  });

  test(`able to receive message from websocket`, async () => {
    const mockDeal = createMockDeal();
    const server = new WS('ws://localhost:8080');

    xhrMock
      .get('http://localhost:3000/deal/dealId', {
        status: 201,
        body: JSON.stringify(mockDeal),
      })
      .post('http://localhost:3000/register', (req, res) => {
        const body = JSON.parse(req.body());

        return res.status(201).body(
          JSON.stringify({
            ...body,
            _id: 'userId',
          })
        );
      });

    const { findByText, getByText, findByLabelText, getByLabelText } = setup();

    await findByText('Login first to place cast.');

    user.click(getByText('Sign up'));

    await user.type(getByLabelText('Email'), 'malcolm@gmail.com');
    await user.type(getByLabelText('Name'), 'Malcolm Kee');

    user.click(getByText('Signup'));

    await findByLabelText('Bid Amount');

    await server.connected;

    const newPrice = mockDeal.startingPrice + 200;

    act(() => {
      server.send(
        JSON.stringify({
          type: 'bid_accepted',
          payload: {
            bidId: 'bidId',
            dealId: mockDeal._id,
            price: newPrice,
          },
        })
      );
    });

    expect(getByText(`RM ${newPrice.toLocaleString()}.00`)).toBeVisible();

    act(() => {
      // simulate race condition where lower price comes later
      server.send(
        JSON.stringify({
          type: 'bid_accepted',
          payload: {
            bidId: 'bidId',
            dealId: mockDeal._id,
            price: newPrice - 200,
          },
        })
      );
    });

    expect(getByText(`RM ${newPrice.toLocaleString()}.00`)).toBeVisible();
  });
});

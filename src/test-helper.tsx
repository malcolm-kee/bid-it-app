import { render } from '@testing-library/react';
import * as React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

export const renderWithRouter = (ui: React.ReactNode, { initialRoute = '/' } = {}) => {
  const history = createMemoryHistory({
    initialEntries: [initialRoute],
  });

  return { ...render(<Router history={history}>{ui}</Router>), history };
};

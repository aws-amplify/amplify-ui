import React from 'react';
import { render, waitFor } from '@testing-library/react';
import createProvider from '../../../createProvider';

import { ListView } from '../ListView';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);

const Provider = createProvider({ config: { listLocations } });

describe('ListView', () => {
  it('renders a `ListView`', async () => {
    await waitFor(() => {
      expect(
        render(
          <Provider>
            <ListView />
          </Provider>
        ).container
      ).toBeDefined();
    });
  });
});

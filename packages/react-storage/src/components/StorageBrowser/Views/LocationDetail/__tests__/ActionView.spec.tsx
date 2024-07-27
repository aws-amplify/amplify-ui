import React from 'react';
import { render, waitFor } from '@testing-library/react';
import createProvider from '../../../createProvider';

import { ActionView } from '../ActionView';

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);

const Provider = createProvider({ config: { listLocations } });

describe('ActionView', () => {
  it('renders a `ActionView`', async () => {
    await waitFor(() => {
      expect(
        render(
          <Provider>
            <ActionView />
          </Provider>
        ).container
      ).toBeDefined();
    });
  });
});

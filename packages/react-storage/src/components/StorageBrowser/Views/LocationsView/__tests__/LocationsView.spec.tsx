import React from 'react';
import { render } from '@testing-library/react';

import { ControlProvider } from '../../../context/controls';

import { LocationsView } from '..';

describe('LocationsListView', () => {
  it('renders a `LocationsListView`', () => {
    expect(
      render(
        <ControlProvider>
          <LocationsView />
        </ControlProvider>
      ).container
    ).toBeDefined();
  });
});

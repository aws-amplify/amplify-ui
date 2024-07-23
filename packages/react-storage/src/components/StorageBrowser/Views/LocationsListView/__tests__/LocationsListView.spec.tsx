import React from 'react';
import { render } from '@testing-library/react';

import { ControlProvider } from '../../../context/controls';

import { LocationsListView } from '..';

describe('LocationsListView', () => {
  it('renders a `LocationsListView`', () => {
    expect(
      render(
        <ControlProvider>
          <LocationsListView />
        </ControlProvider>
      ).container
    ).toBeDefined();
  });
});

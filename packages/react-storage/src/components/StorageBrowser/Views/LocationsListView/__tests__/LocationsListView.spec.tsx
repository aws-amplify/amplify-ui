import React from 'react';
import { render } from '@testing-library/react';
import { LocationsListView } from '..';

describe('LocationsListView', () => {
  it('renders a `LocationsListView`', () => {
    expect(render(<LocationsListView />).container).toBeDefined();
  });
});

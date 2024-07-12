import React from 'react';
import { render } from '@testing-library/react';
import LocationsListView from '../LocationsListView';

describe('LocationsListView', () => {
  it('renders a LocationsListView element', () => {
    expect(render(<LocationsListView />).container).toBeDefined();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import LocationsView from '../LocationsView';

describe('LocationsView', () => {
  it('renders a LocationsView element', () => {
    expect(render(<LocationsView />).container).toBeDefined();
  });
});

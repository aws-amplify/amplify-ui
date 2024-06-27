import React from 'react';
import { render } from '@testing-library/react';
import LocationView from '../LocationView';

describe('LocationView', () => {
  it('renders a LocationView element', () => {
    expect(render(<LocationView />).container).toBeDefined();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { LocationDetailView } from '../LocationDetailView';

describe('LocationDetailView', () => {
  it('renders a `LocationDetailView`', () => {
    expect(render(<LocationDetailView />).container).toBeDefined();
  });
});

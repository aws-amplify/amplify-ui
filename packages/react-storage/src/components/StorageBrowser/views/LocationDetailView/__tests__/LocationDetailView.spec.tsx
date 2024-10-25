import React from 'react';
import { render } from '@testing-library/react';

import { LocationDetailView } from '../LocationDetailView';

jest.mock('../Controls', () => ({
  LocationDetailViewControls: () => (
    <div data-testid="LOCATION_DETAIL_VIEW_CONTROLS" />
  ),
}));

describe('LocationDetailView', () => {
  it('renders a `LocationDetailView`', () => {
    const { getByTestId } = render(<LocationDetailView />);

    expect(getByTestId('LOCATION_DETAIL_VIEW')).toBeInTheDocument();
    expect(getByTestId('LOCATION_DETAIL_VIEW_CONTROLS')).toBeInTheDocument();
  });
});

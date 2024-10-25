import React from 'react';
import { render } from '@testing-library/react';

import * as StoreModule from '../providers/store';
import * as ViewsModule from '../views/context';
import { StorageBrowserDefault } from '../StorageBrowserDefault';

jest.spyOn(ViewsModule, 'useViews').mockReturnValue({
  LocationsView: () => <div data-testid="LOCATIONS_VIEW" />,
  LocationDetailView: () => <div data-testid="LOCATION_DETAIL_VIEW" />,
  LocationActionView: () => <div data-testid="LOCATION_ACTION_VIEW" />,
});

const useStoreSpy = jest.spyOn(StoreModule, 'useStore');

const location = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permission: 'READWRITE',
  prefix: 'test-prefix/',
  type: 'PREFIX',
};

describe('StorageBrowserDefault', () => {
  afterEach(jest.clearAllMocks);

  it('renders the `LocationsView` by default', () => {
    useStoreSpy.mockReturnValueOnce([
      {
        actionType: undefined,
        history: { current: undefined, previous: undefined },
      } as StoreModule.UseStoreState,
      jest.fn(),
    ]);
    const { getByTestId } = render(<StorageBrowserDefault />);

    expect(getByTestId('LOCATIONS_VIEW')).toBeInTheDocument();
  });

  it('renders the `LocationDetailView` when a location is selected', () => {
    useStoreSpy.mockReturnValueOnce([
      {
        actionType: undefined,
        history: { current: location, previous: [location] },
      } as StoreModule.UseStoreState,
      jest.fn(),
    ]);

    const { getByTestId } = render(<StorageBrowserDefault />);

    expect(getByTestId('LOCATION_DETAIL_VIEW')).toBeInTheDocument();
  });

  it('renders the `LocationActionView` when an action is selected', () => {
    useStoreSpy.mockReturnValueOnce([
      {
        actionType: 'super-coll-action-type',
        history: { current: location, previous: [location] },
      } as StoreModule.UseStoreState,
      jest.fn(),
    ]);
    const { getByTestId } = render(<StorageBrowserDefault />);

    expect(getByTestId('LOCATION_ACTION_VIEW')).toBeInTheDocument();
  });
});

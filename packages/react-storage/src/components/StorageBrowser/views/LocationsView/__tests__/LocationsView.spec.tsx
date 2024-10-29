import React from 'react';
import { render, screen } from '@testing-library/react';

import * as ActionsModule from '../../../do-not-import-from-here/actions';

import { LocationsView } from '../LocationsView';
import { DEFAULT_LIST_OPTIONS, DEFAULT_ERROR_MESSAGE } from '../LocationsView';

const useLocationsDataSpy = jest.spyOn(ActionsModule, 'useLocationsData');

const handleListLocations = jest.fn();

const initialState: ActionsModule.LocationsDataState = [
  {
    data: { result: [], nextToken: undefined },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

const loadingState: ActionsModule.LocationsDataState = [
  {
    data: { result: [], nextToken: undefined },
    hasError: false,
    isLoading: true,
    message: undefined,
  },
  handleListLocations,
];

const location = {
  bucket: 'tester',
  prefix: '🏃‍♀️‍➡️/',
  permission: 'READWRITE' as const,
  id: 'identity',
  type: 'BUCKET' as const,
};
const resolvedState: ActionsModule.LocationsDataState = [
  {
    data: {
      result: [location],
      nextToken: undefined,
    },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

describe('LocationsListView', () => {
  beforeEach(() => {
    handleListLocations.mockClear();
    useLocationsDataSpy.mockClear();
  });

  it('renders a returned error message for `LocationsListView`', () => {
    const errorMessage = 'Something went wrong.';

    useLocationsDataSpy.mockReturnValue([
      {
        data: { result: [location], nextToken: 'some-token' },
        hasError: true,
        isLoading: false,
        message: errorMessage,
      },
      handleListLocations,
    ]);

    render(<LocationsView />);

    const message = screen.getByRole('alert');
    const messageText = screen.getByText(errorMessage);
    expect(message).toBeInTheDocument();
    expect(messageText).toBeInTheDocument();

    // table doesn't render
    const table = screen.queryByRole('table');
    expect(table).not.toBeInTheDocument();

    // pagination disabled
    const nextPage = screen.getByLabelText('Go to next page');
    expect(nextPage).toBeDisabled();
    const prevPage = screen.getByLabelText('Go to previous page');
    expect(prevPage).toBeDisabled();
  });

  it('renders a fallback error message for `LocationsListView`', () => {
    useLocationsDataSpy.mockReturnValue([
      {
        data: { result: [], nextToken: undefined },
        hasError: true,
        isLoading: false,
        message: undefined,
      },
      handleListLocations,
    ]);

    render(<LocationsView />);

    const messageText = screen.getByText(DEFAULT_ERROR_MESSAGE);
    expect(messageText).toBeInTheDocument();
  });

  it('renders a Locations View table', () => {
    useLocationsDataSpy.mockReturnValue([
      {
        data: { result: [location], nextToken: undefined },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      handleListLocations,
    ]);

    render(<LocationsView />);

    const table = screen.getByRole('table');

    expect(table).toBeDefined();
  });

  it.todo('handles failure from locations loading as expected');

  it.todo('handles empty locations result data as expected');

  it('behaves as expected on initial render', () => {
    useLocationsDataSpy
      .mockReturnValueOnce(initialState)
      .mockReturnValueOnce(loadingState)
      .mockReturnValue(resolvedState);

    const { rerender } = render(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledWith({
      options: {
        ...DEFAULT_LIST_OPTIONS,
        refresh: true,
      },
    });

    rerender(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);

    rerender(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
  });

  it('refreshes locations on handleListLocations reference change', () => {
    const updatedHandleListLocations = jest.fn();

    useLocationsDataSpy.mockReturnValue(initialState);

    // initial
    const { rerender } = render(<LocationsView />);

    useLocationsDataSpy.mockReturnValue(loadingState);

    // loading
    rerender(<LocationsView />);

    useLocationsDataSpy.mockReturnValueOnce(resolvedState);

    // resolved
    rerender(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledWith({
      options: { exclude: 'WRITE', pageSize: 100, refresh: true },
    });
    expect(updatedHandleListLocations).not.toHaveBeenCalled();

    useLocationsDataSpy.mockReturnValue([
      { ...resolvedState[0] },
      updatedHandleListLocations,
    ]);

    // reference change
    rerender(<LocationsView />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledWith({
      options: { exclude: 'WRITE', pageSize: 100, refresh: true },
    });
  });
});

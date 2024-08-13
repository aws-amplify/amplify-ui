import React from 'react';
import { render } from '@testing-library/react';

import * as ActionsModule from './../context/actions';
import { Controller } from '../Controller';

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
const resolvedState: ActionsModule.LocationsDataState = [
  {
    data: {
      result: [
        {
          permission: 'READWRITE',
          scope: 's3://test-bucket/*',
          type: 'BUCKET',
        },
      ],
      nextToken: undefined,
    },
    hasError: false,
    isLoading: false,
    message: undefined,
  },
  handleListLocations,
];

describe('Controller', () => {
  beforeEach(() => {
    handleListLocations.mockClear();
    useLocationsDataSpy.mockClear();
  });

  it('behaves as expected on initial render', () => {
    useLocationsDataSpy
      .mockReturnValueOnce(initialState)
      .mockReturnValueOnce(loadingState)
      .mockReturnValue(resolvedState);

    const { rerender } = render(<Controller />);

    expect(useLocationsDataSpy).toHaveBeenCalledTimes(1);
    expect(useLocationsDataSpy).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledTimes(1);

    rerender(<Controller />);

    expect(useLocationsDataSpy).toHaveBeenCalledTimes(2);
    expect(handleListLocations).toHaveBeenCalledTimes(1);

    rerender(<Controller />);

    expect(useLocationsDataSpy).toHaveBeenCalledTimes(3);
    expect(handleListLocations).toHaveBeenCalledTimes(1);
  });

  it.todo('handles failure from locations loading as expected');

  it.todo('handles empty locations result data as expected');

  it('refreshes locations on handleListLocations reference change', () => {
    const updatedHandleListLocations = jest.fn();

    useLocationsDataSpy
      .mockReturnValueOnce(initialState)
      .mockReturnValueOnce(loadingState)
      .mockReturnValueOnce(resolvedState)
      .mockReturnValue([{ ...resolvedState[0] }, updatedHandleListLocations]);

    // initial
    const { rerender } = render(<Controller />);

    // loading
    rerender(<Controller />);
    // resolved
    rerender(<Controller />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(handleListLocations).toHaveBeenCalledWith({
      options: { pageSize: 1000, reset: true },
    });
    expect(updatedHandleListLocations).not.toHaveBeenCalled();

    // reference change
    rerender(<Controller />);

    expect(handleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledTimes(1);
    expect(updatedHandleListLocations).toHaveBeenCalledWith({
      options: { pageSize: 1000, reset: true },
    });
  });
});

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import * as UseLocationsDataModule from '../../../../do-not-import-from-here/actions';
import * as StoreModule from '../../../../providers/store';

import { DataTableControl } from '../DataTable';

const TEST_RANGE: [number, number] = [0, 100];

const dispatchStoreAction = jest.fn();
jest
  .spyOn(StoreModule, 'useStore')
  .mockReturnValue([{} as StoreModule.UseStoreState, dispatchStoreAction]);

const useLocationsDataSpy = jest.spyOn(
  UseLocationsDataModule,
  'useLocationsData'
);

const mockData = [
  {
    bucket: 'Location A',
    id: 'A',
    prefix: '',
    type: 'BUCKET' as const,
    permission: 'READ' as const,
  },
  {
    bucket: 'Location B',
    id: 'B',
    prefix: 'Folder B/',
    type: 'PREFIX' as const,
    permission: 'WRITE' as const,
  },
];

describe('LocationsViewTableControl', () => {
  beforeEach(() => {
    useLocationsDataSpy.mockReturnValue([
      {
        data: { result: mockData, nextToken: undefined },
        hasError: false,
        isLoading: false,
        message: undefined,
      },
      jest.fn(),
    ]);
  });

  afterEach(jest.clearAllMocks);

  it('renders the table with data', () => {
    const { getAllByText, getByText } = render(
      <DataTableControl range={TEST_RANGE} />
    );

    expect(getByText('Folder')).toBeInTheDocument();
    expect(getByText('Bucket')).toBeInTheDocument();
    expect(getByText('Permission')).toBeInTheDocument();
    expect(getByText('Folder B/')).toBeInTheDocument();

    // when prefix is an empty string the bucket value is used in both
    // the "Bucket" and "Folder" columns
    expect(getAllByText('Location A')).toHaveLength(2);
  });

  it('renders the correct icon based on sort state', () => {
    const { getByRole, getByText } = render(
      <DataTableControl range={TEST_RANGE} />
    );

    const folderTh = getByRole('columnheader', { name: 'Folder' });

    expect(folderTh).toHaveAttribute('aria-sort', 'ascending');

    fireEvent.click(getByText('Folder'));

    expect(folderTh).toHaveAttribute('aria-sort', 'descending');
  });

  it('updates sort state when other headers are clicked', () => {
    const { getByRole, getByText } = render(
      <DataTableControl range={TEST_RANGE} />
    );

    const folderTh = getByRole('columnheader', { name: 'Folder' });

    expect(folderTh).toHaveAttribute('aria-sort', 'ascending');

    const bucketTh = getByRole('columnheader', { name: 'Bucket' });

    fireEvent.click(getByText('Bucket'));

    expect(bucketTh).toHaveAttribute('aria-sort', 'descending');
  });

  it('triggers location click handler when a row is clicked', () => {
    const { getByRole } = render(<DataTableControl range={TEST_RANGE} />);

    const firstRowButton = getByRole('button', { name: 'Folder B/' });
    fireEvent.click(firstRowButton);

    expect(dispatchStoreAction).toHaveBeenCalledWith({
      type: 'NAVIGATE',
      destination: mockData[1],
    });
  });
});

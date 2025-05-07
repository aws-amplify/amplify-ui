import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTableControl } from '../DataTableControl';
import { useDataTable } from '../hooks/useDataTable';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useDataTable');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../components', () => ({
  DataTable: () => <div data-testid="data-table" />,
}));

describe('DataTableControl', () => {
  const mockUseDataTable = jest.mocked(useDataTable);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseDataTable.mockClear();
  });

  it('renders', () => {
    render(<DataTableControl />);

    const dataTable = screen.getByTestId('data-table');

    expect(dataTable).toBeInTheDocument();
  });
});

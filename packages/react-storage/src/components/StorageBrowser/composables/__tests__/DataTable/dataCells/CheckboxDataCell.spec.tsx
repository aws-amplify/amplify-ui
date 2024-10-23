import React from 'react';
import { render, screen } from '@testing-library/react';
import { CheckboxDataCell } from '../../../DataTable/dataCells/CheckboxDataCell';

describe('CheckboxDataCell', () => {
  it('renders', () => {
    render(
      <CheckboxDataCell
        content={{ label: 'data-cell-checkbox', onSelect: jest.fn() }}
      />
    );

    const checkboxDataCell = screen.getByRole('checkbox');

    expect(checkboxDataCell).toBeInTheDocument();
    expect(checkboxDataCell).not.toBeChecked();
  });

  it('renders as checked', () => {
    render(
      <CheckboxDataCell content={{ checked: true, onSelect: jest.fn() }} />
    );

    const checkboxDataCell = screen.getByRole('checkbox');

    expect(checkboxDataCell).toBeChecked();
  });

  it('can be selected', () => {
    const mockOnSelect = jest.fn();
    render(<CheckboxDataCell content={{ onSelect: mockOnSelect }} />);

    const checkboxDataCell = screen.getByRole('checkbox');
    checkboxDataCell.click();

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});

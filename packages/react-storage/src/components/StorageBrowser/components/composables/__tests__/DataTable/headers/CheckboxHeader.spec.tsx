import React from 'react';
import { render, screen } from '@testing-library/react';
import { CheckboxHeader } from '../../../DataTable/headers/CheckboxHeader';

describe('CheckboxHeader', () => {
  it('renders', () => {
    render(
      <CheckboxHeader
        content={{ label: 'header-checkbox', onSelect: jest.fn() }}
      />
    );

    const checkboxHeader = screen.getByRole('checkbox');

    expect(checkboxHeader).toBeInTheDocument();
    expect(checkboxHeader).not.toBeChecked();
  });

  it('renders as checked', () => {
    render(<CheckboxHeader content={{ checked: true, onSelect: jest.fn() }} />);

    const checkboxHeader = screen.getByRole('checkbox');

    expect(checkboxHeader).toBeChecked();
  });

  it('can be selected', () => {
    const mockOnSelect = jest.fn();
    render(<CheckboxHeader content={{ onSelect: mockOnSelect }} />);

    const checkboxDataCell = screen.getByRole('checkbox');
    checkboxDataCell.click();

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});

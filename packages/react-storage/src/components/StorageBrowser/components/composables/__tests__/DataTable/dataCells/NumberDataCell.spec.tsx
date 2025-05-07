import React from 'react';
import { render, screen } from '@testing-library/react';
import { NumberDataCell } from '../../../DataTable/dataCells/NumberDataCell';

describe('NumberDataCell', () => {
  it('renders', () => {
    render(
      <NumberDataCell
        content={{ value: 123, displayValue: 'data-cell-number' }}
      />
    );

    const numberDataCell = screen.getByText('data-cell-number');

    expect(numberDataCell).toBeInTheDocument();
  });

  it('falls back to raw value if no displayValue is provided', () => {
    render(<NumberDataCell content={{ value: 123 }} />);

    const numberDataCell = screen.getByText('123');

    expect(numberDataCell).toBeInTheDocument();
  });
});

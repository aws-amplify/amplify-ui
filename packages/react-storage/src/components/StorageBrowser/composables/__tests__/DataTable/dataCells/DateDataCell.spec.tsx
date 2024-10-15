import React from 'react';
import { render, screen } from '@testing-library/react';
import { DateDataCell } from '../../../DataTable/dataCells/DateDataCell';

describe('DateDataCell', () => {
  it('renders', () => {
    render(<DateDataCell content={{ date: new Date(1726704000000) }} />);

    const dateDataCell = screen.getByText('9/18/2024, 5:00:00 PM');

    expect(dateDataCell).toBeInTheDocument();
  });
});

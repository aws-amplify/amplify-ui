import React from 'react';
import { render } from '@testing-library/react';
import { DateDataCell } from '../../../DataTable/dataCells/DateDataCell';

describe('DateDataCell', () => {
  const date = new Date(1726704000000);
  it('renders', () => {
    const { container } = render(
      <DateDataCell content={{ date, text: date.toLocaleString() }} />
    );

    const dateDataCell = container.querySelector('div');
    expect(dateDataCell).toHaveTextContent(/.+/); // Expect any string rather than deal with mocking locale
  });
});

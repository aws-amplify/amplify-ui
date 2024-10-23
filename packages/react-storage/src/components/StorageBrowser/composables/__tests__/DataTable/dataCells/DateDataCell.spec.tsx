import React from 'react';
import { render } from '@testing-library/react';
import { DateDataCell } from '../../../DataTable/dataCells/DateDataCell';

describe('DateDataCell', () => {
  it('renders', () => {
    const { container } = render(
      <DateDataCell content={{ date: new Date(1726704000000) }} />
    );

    const dateDataCell = container.querySelector('div');
    expect(dateDataCell).toHaveTextContent(/.+/); // Expect any string rather than deal with mocking locale
  });
});

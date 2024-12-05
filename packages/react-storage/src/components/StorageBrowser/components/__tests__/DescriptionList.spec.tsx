import React from 'react';
import { render, screen } from '@testing-library/react';
import { DescriptionList } from '../DescriptionList';

describe('DescriptionList', () => {
  it('renders', () => {
    const term = 'Description Term';
    const details = 'Description Details';

    render(
      <DescriptionList
        descriptions={[
          { term: `${term} 1`, details: `${details} 1` },
          { term: `${term} 2`, details: `${details} 2` },
        ]}
      />
    );

    const list = screen.getByRole('list');
    const terms = screen.getAllByRole('term');
    const definitions = screen.getAllByRole('definition');

    expect(list).toBeInTheDocument();
    expect(terms[0]).toHaveTextContent(`${term} 1`);
    expect(terms[1]).toHaveTextContent(`${term} 2`);
    expect(definitions[0]).toHaveTextContent(`${details} 1`);
    expect(definitions[1]).toHaveTextContent(`${details} 2`);
  });
});

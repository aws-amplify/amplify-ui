import React from 'react';
import { render, screen } from '@testing-library/react';
import { UploadSummary } from '../UploadSummary';

describe('UploadSummary', () => {
  it('renders an UploadSummary with no data', () => {
    render(<UploadSummary />);

    const list = screen.getByRole('list');
    const terms = screen.getAllByRole('term');
    const definitions = screen.getAllByRole('definition');

    expect(list).toBeInTheDocument();
    expect(terms.length).toBe(4);
    for (const definition of definitions) {
      expect(definition).toHaveTextContent('0/0');
    }
  });

  it('renders an UploadSummary with data', () => {
    const total = 10;
    const complete = 4;
    const failed = 3;
    const canceled = 2;
    const queued = 1;

    render(
      <UploadSummary
        total={total}
        complete={complete}
        failed={failed}
        canceled={canceled}
        queued={queued}
      />
    );

    const definitions = screen.getAllByRole('definition');

    expect(definitions[0]).toHaveTextContent(`${complete}/${total}`);
    expect(definitions[1]).toHaveTextContent(`${failed}/${total}`);
    expect(definitions[2]).toHaveTextContent(`${canceled}/${total}`);
    expect(definitions[3]).toHaveTextContent(`${queued}/${total}`);
  });
});

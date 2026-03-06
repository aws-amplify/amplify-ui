import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusDisplay } from '../StatusDisplay';

describe('StatusDisplay', () => {
  it('renders', () => {
    const statuses = [
      { name: 'completed', count: 4 },
      { name: 'failed', count: 3 },
      { name: 'canceled', count: 2 },
      { name: 'queued', count: 1 },
    ];

    render(<StatusDisplay statuses={statuses} total={10} />);

    const [completed, failed, canceled, queued] =
      screen.getAllByRole('definition');

    expect(completed).toHaveTextContent('4/10');
    expect(failed).toHaveTextContent('3/10');
    expect(canceled).toHaveTextContent('2/10');
    expect(queued).toHaveTextContent('1/10');
  });

  it('returns null if there are no statuses to display', () => {
    render(<StatusDisplay statuses={[]} total={10} />);

    const list = screen.queryByRole('list');

    expect(list).not.toBeInTheDocument();
  });
});

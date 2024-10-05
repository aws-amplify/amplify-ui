import React from 'react';
import { render, screen } from '@testing-library/react';
import { getTaskCounts } from '../getTaskCounts';
import { StatusDisplay } from '../StatusDisplay';

jest.mock('../getTaskCounts');

describe('StatusDisplay control', () => {
  // assert mocks
  const mockGetTaskCounts = getTaskCounts as jest.Mock;

  beforeEach(() => {
    mockGetTaskCounts.mockReturnValue({
      COMPLETE: 4,
      FAILED: 3,
      CANCELED: 2,
      QUEUED: 1,
      TOTAL: 10,
    });
  });

  afterEach(() => {
    mockGetTaskCounts.mockReset();
  });

  it('renders', () => {
    // FIXME: Temporarily get via props. Refactor later to get via view hook
    render(<StatusDisplay actionType="BATCH" isCancelable tasks={[]} />);

    const [completed, failed, canceled, queued] =
      screen.getAllByRole('definition');

    expect(completed).toHaveTextContent('4/10');
    expect(failed).toHaveTextContent('3/10');
    expect(canceled).toHaveTextContent('2/10');
    expect(queued).toHaveTextContent('1/10');
  });

  it('renders without canceled tasks', () => {
    mockGetTaskCounts.mockReturnValue({
      COMPLETE: 4,
      FAILED: 3,
      CANCELED: 0,
      QUEUED: 1,
      TOTAL: 8,
    });

    // FIXME: Temporarily get via props. Refactor later to get via view hook
    render(<StatusDisplay actionType="BATCH" tasks={[]} />);

    const definitions = screen.getAllByRole('definition');
    const [completed, failed, queued] = definitions;

    expect(definitions.length).toBe(3);
    expect(completed).toHaveTextContent('4/8');
    expect(failed).toHaveTextContent('3/8');
    expect(queued).toHaveTextContent('1/8');
  });

  it('returns null if the actionType is SINGLE', () => {
    mockGetTaskCounts.mockReturnValue({
      COMPLETE: 4,
      FAILED: 3,
      CANCELED: 0,
      QUEUED: 1,
      TOTAL: 8,
    });

    // FIXME: Temporarily get via props. Refactor later to get via view hook
    render(<StatusDisplay actionType="SINGLE" isCancelable tasks={[]} />);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('term')).not.toBeInTheDocument();
    expect(screen.queryByRole('definition')).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { useResolvedComposable } from '../hooks/useResolvedComposable';
import { useStatusDisplay } from '../hooks/useStatusDisplay';
import { StatusDisplayControl } from '../StatusDisplayControl';

jest.mock('../hooks/useStatusDisplay');
jest.mock('../hooks/useResolvedComposable');

describe('StatusDisplayControl', () => {
  // assert mocks
  const mockUseStatusDisplay = useStatusDisplay as jest.Mock;
  const mockUseResolvedComposable = useResolvedComposable as jest.Mock;

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component: React.JSX.Element) => component
    );
  });

  afterEach(() => {
    mockUseStatusDisplay.mockReset();
    mockUseResolvedComposable.mockClear();
  });

  it('renders', () => {
    mockUseStatusDisplay.mockReturnValue({
      statuses: [
        { name: 'foo', count: 1 },
        { name: 'bar', count: 2 },
        { name: 'qux', count: 3 },
      ],
      total: 6,
    });

    render(<StatusDisplayControl />);

    const [foo, bar, qux] = screen.getAllByRole('definition');

    expect(foo).toHaveTextContent('1/6');
    expect(bar).toHaveTextContent('2/6');
    expect(qux).toHaveTextContent('3/6');
  });

  it('returns null without props', () => {
    mockUseStatusDisplay.mockReturnValue({});

    render(<StatusDisplayControl />);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('term')).not.toBeInTheDocument();
    expect(screen.queryByRole('definition')).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { resolveComposable } from '../resolveComposable';
import { useControl } from '../hooks/useControl';
import { StatusDisplayControl } from '../StatusDisplayControl';

jest.mock('../hooks/useControl');
jest.mock('../resolveComposable');

describe('StatusDisplayControl', () => {
  // assert mocks
  const mockUseControl = useControl as jest.Mock;
  const mockResolveComposable = resolveComposable as jest.Mock;

  beforeAll(() => {
    mockResolveComposable.mockImplementation(
      (component: React.JSX.Element) => component
    );
  });

  afterEach(() => {
    mockUseControl.mockReset();
    mockResolveComposable.mockClear();
  });

  it('renders', () => {
    mockUseControl.mockReturnValue({
      props: {
        statuses: [
          { name: 'foo', count: 1 },
          { name: 'bar', count: 2 },
          { name: 'qux', count: 3 },
        ],
        total: 6,
      },
    });

    render(<StatusDisplayControl />);

    const [foo, bar, qux] = screen.getAllByRole('definition');

    expect(foo).toHaveTextContent('1/6');
    expect(bar).toHaveTextContent('2/6');
    expect(qux).toHaveTextContent('3/6');
  });

  it('returns null without props', () => {
    mockUseControl.mockReturnValue({});

    render(<StatusDisplayControl />);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('term')).not.toBeInTheDocument();
    expect(screen.queryByRole('definition')).not.toBeInTheDocument();
  });
});

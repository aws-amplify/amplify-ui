import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionStartControl } from '../ActionStartControl';
import { useActionStart } from '../hooks/useActionStart';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useActionStart');
jest.mock('../hooks/useResolvedComposable');
describe('ActionStartControl', () => {
  // assert mocks
  const mockUseActionStart = useActionStart as jest.Mock;
  const mockUseResolvedComposable = useResolvedComposable as jest.Mock;

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component: React.JSX.Element) => component
    );
  });
  afterEach(() => {
    mockUseActionStart.mockReset();
    mockUseResolvedComposable.mockClear();
  });

  it('renders', () => {
    mockUseActionStart.mockReturnValue({
      props: {
        isDisabled: false,
        onClick: jest.fn(),
        label: 'Start',
      },
    });
    render(<ActionStartControl />);

    const button = screen.getByRole('button', {
      name: 'Start',
    });

    expect(button).toBeInTheDocument();
  });

  it('returns null without props', () => {
    mockUseActionStart.mockReturnValue({});

    render(<ActionStartControl />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

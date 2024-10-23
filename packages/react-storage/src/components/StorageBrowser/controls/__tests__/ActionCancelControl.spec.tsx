import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionCancelControl } from '../ActionCancelControl';
import { useActionCancel } from '../hooks/useActionCancel';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useActionCancel');
jest.mock('../hooks/useResolvedComposable');
describe('ActionCancelControl', () => {
  // assert mocks
  const mockUseActionCancel = useActionCancel as jest.Mock;
  const mockUseResolvedComposable = useResolvedComposable as jest.Mock;

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component: React.JSX.Element) => component
    );
  });
  afterEach(() => {
    mockUseActionCancel.mockReset();
    mockUseResolvedComposable.mockClear();
  });

  it('renders', () => {
    mockUseActionCancel.mockReturnValue({
      props: {
        disabled: false,
        onClick: jest.fn(),
        text: 'Cancel',
      },
    });
    render(<ActionCancelControl />);

    const button = screen.getByRole('button', {
      name: 'Cancel',
    });

    expect(button).toBeInTheDocument();
  });

  it('renders an icon when text is not available', () => {
    const ariaLabel = 'Cancel file upload';

    mockUseActionCancel.mockReturnValue({
      props: {
        disabled: undefined,
        onClick: jest.fn(),
        ariaLabel,
      },
    });
    render(<ActionCancelControl />);

    const button = screen.getByRole('button', {
      name: ariaLabel,
    });

    const icon = button.querySelector('svg');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('returns null without props', () => {
    mockUseActionCancel.mockReturnValue({});

    render(<ActionCancelControl />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

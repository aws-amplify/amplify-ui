import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusDisplayControl } from '../StatusDisplayControl';
import { useStatusDisplay } from '../hooks/useStatusDisplay';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useStatusDisplay');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../components/composables/StatusDisplay', () => ({
  StatusDisplay: () => <div data-testid="status-display" />,
}));

describe('StatusDisplayControl', () => {
  const mockUseStatusDisplay = jest.mocked(useStatusDisplay);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseStatusDisplay.mockClear();
  });

  it('renders', () => {
    render(<StatusDisplayControl />);

    const statusDisplay = screen.getByTestId('status-display');

    expect(statusDisplay).toBeInTheDocument();
  });
});

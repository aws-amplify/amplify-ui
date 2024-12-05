import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionDestinationControl } from '../ActionDestinationControl';
import { useActionDestination } from '../hooks/useActionDestination';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useActionDestination');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/ActionDestination', () => ({
  ActionDestination: () => <div data-testid="action-destination" />,
}));

describe('ActionDestinationControl', () => {
  const mockUseActionDestination = jest.mocked(useActionDestination);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseActionDestination.mockClear();
  });

  it('renders', () => {
    render(<ActionDestinationControl />);

    const actionDestination = screen.getByTestId('action-destination');

    expect(actionDestination).toBeInTheDocument();
  });
});

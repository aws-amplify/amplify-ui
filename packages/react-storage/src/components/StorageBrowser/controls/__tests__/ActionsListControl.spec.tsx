import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActionsListControl } from '../ActionsListControl';
import { useActionsList } from '../hooks/useActionsList';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useActionsList');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/ActionsList', () => ({
  ActionsList: () => <div data-testid="actions-list" />,
}));

describe('ActionsListControl', () => {
  const mockUseActionsList = jest.mocked(useActionsList);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseActionsList.mockClear();
  });

  it('renders', () => {
    render(<ActionsListControl />);

    const actionsList = screen.getByTestId('actions-list');

    expect(actionsList).toBeInTheDocument();
  });
});

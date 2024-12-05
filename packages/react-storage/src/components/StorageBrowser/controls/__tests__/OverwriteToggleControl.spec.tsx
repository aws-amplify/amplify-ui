import React from 'react';
import { render, screen } from '@testing-library/react';
import { OverwriteToggleControl } from '../OverwriteToggleControl';
import { useOverwriteToggle } from '../hooks/useOverwriteToggle';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useOverwriteToggle');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/OverwriteToggle', () => ({
  OverwriteToggle: () => <div data-testid="overwrite-toggle" />,
}));

describe('OverwriteToggleControl', () => {
  const mockUseOverwriteToggle = jest.mocked(useOverwriteToggle);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseOverwriteToggle.mockClear();
  });

  it('renders', () => {
    render(<OverwriteToggleControl />);

    const overwriteToggle = screen.getByTestId('overwrite-toggle');

    expect(overwriteToggle).toBeInTheDocument();
  });
});

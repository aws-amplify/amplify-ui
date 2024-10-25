import React from 'react';
import { render, screen } from '@testing-library/react';
import { useResolvedComposable } from '../hooks/useResolvedComposable';
import { useDropZone } from '../hooks/useDropZone';
import { DropZoneControl } from '../DropZoneControl';

jest.mock('../hooks/useDropZone');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../composables/DropZone', () => ({
  DropZone: () => <div data-testid="default-drop-zone" />,
}));

describe('DropZoneControl', () => {
  // assert mocks
  const mockUseDropZone = useDropZone as jest.Mock;
  const mockUseResolvedComposable = useResolvedComposable as jest.Mock;

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component: React.JSX.Element) => component
    );
  });

  afterEach(() => {
    mockUseDropZone.mockReset();
    mockUseResolvedComposable.mockClear();
  });

  it('renders', () => {
    mockUseDropZone.mockReturnValue({});

    render(
      <DropZoneControl className="my-class-name">
        <table />
      </DropZoneControl>
    );

    const defaultDropZone = screen.getByTestId('default-drop-zone');

    expect(defaultDropZone.parentElement).toHaveClass('my-class-name');
  });
});

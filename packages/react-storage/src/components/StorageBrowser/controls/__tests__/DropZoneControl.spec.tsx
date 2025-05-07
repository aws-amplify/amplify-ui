import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropZoneControl } from '../DropZoneControl';
import { useDropZone } from '../hooks/useDropZone';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useDropZone');
jest.mock('../hooks/useResolvedComposable');
jest.mock('../../components/composables/DropZone', () => ({
  DropZone: () => <div data-testid="drop-zone" />,
}));

describe('DropZoneControl', () => {
  const mockUseDropZone = jest.mocked(useDropZone);
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  afterEach(() => {
    mockUseDropZone.mockClear();
  });

  it('renders', () => {
    render(
      <DropZoneControl>
        <table />
      </DropZoneControl>
    );

    const dropZone = screen.getByTestId('drop-zone');

    expect(dropZone).toBeInTheDocument();
  });
});

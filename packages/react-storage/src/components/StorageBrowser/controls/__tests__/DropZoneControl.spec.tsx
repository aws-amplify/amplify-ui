import React from 'react';
import { render, screen } from '@testing-library/react';
import { useResolvedComposable } from '../hooks/useResolvedComposable';
import { useDropZone } from '../hooks/useDropZone';
import { DropZoneControl } from '../DropZoneControl';
import { AMPLIFY_CLASS_BASE } from '../../views/constants';

jest.mock('../hooks/useDropZone');
jest.mock('../hooks/useResolvedComposable');

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
      <DropZoneControl>
        <table />
      </DropZoneControl>
    );

    const child = screen.getByRole('table');

    expect(child.parentElement).toHaveClass(`${AMPLIFY_CLASS_BASE}__drop-zone`);
  });
});

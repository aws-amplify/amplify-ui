import { renderHook } from '@testing-library/react';
import { DropZoneProps } from '../../../composables/DropZone';
import { useControlsContext } from '../../../controls/context';
import { useDropZone } from '../useDropZone';

jest.mock('../../../controls/context');

describe('useDropZone', () => {
  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data: {},
      onDropFiles: jest.fn(),
    });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns DropZone props', () => {
    const { result } = renderHook(() => useDropZone());

    const expected: DropZoneProps = {
      onDropFiles: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});

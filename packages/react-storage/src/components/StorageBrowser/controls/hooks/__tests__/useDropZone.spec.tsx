import { useControlsContext } from '../../../controls/context';
import { useDropZone } from '../useDropZone';

jest.mock('../../../controls/context');

describe('useDropZone', () => {
  // assert mocks
  const mockUseControlsContext = useControlsContext as jest.Mock;

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns useDropZone data', () => {
    const files = [new File([], '')];
    const mockOnDropFiles = jest.fn();
    mockUseControlsContext.mockReturnValue({
      onDropFiles: mockOnDropFiles,
    });

    const result = useDropZone();
    result.props!.onDropComplete!(files);

    expect(result).toStrictEqual({
      props: {
        onDropComplete: expect.any(Function),
      },
    });
    expect(mockOnDropFiles).toHaveBeenCalledWith(files);
  });
});

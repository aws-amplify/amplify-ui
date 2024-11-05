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
    const acceptedFiles = [new File([], '')];
    const mockOnDropComplete = jest.fn();
    mockUseControlsContext.mockReturnValue({
      onDropComplete: mockOnDropComplete,
    });

    const result = useDropZone();
    result.props!.onDropComplete!({ acceptedFiles });

    expect(result).toStrictEqual({
      props: {
        onDropComplete: expect.any(Function),
      },
    });
    expect(mockOnDropComplete).toHaveBeenCalledWith({ acceptedFiles });
  });
});

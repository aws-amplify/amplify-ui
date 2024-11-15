import { renderHook } from '@testing-library/react';
import { useControlsContext } from '../../../controls/context';
import { useActionDestination } from '../useActionDestination';
import { LocationPermissions } from '../../../actions';
import { getNavigationItems } from '../getNavigationItems';
import { getNavigationParts } from '../getNavigationParts';

jest.mock('../../../controls/context');
jest.mock('../getNavigationItems');
jest.mock('../getNavigationParts');

describe('useActionDestination', () => {
  const actionDestinationLabel = 'action-destination-label';
  const bucket = 'bucket';
  const data = {
    actionDestinationLabel,
    destination: {
      current: {
        bucket,
        id: 'id',
        permissions: ['delete', 'get', 'list', 'write'] as LocationPermissions,
        prefix: 'prefix/',
        type: 'PREFIX',
      },
      path: 'path/',
      key: 'prefix/path/',
    } as const,
  };
  const mockGetNavigationItems = jest.mocked(getNavigationItems);
  const mockGetNavigationParts = jest.mocked(getNavigationParts);
  const mockUseControlsContext = jest.mocked(useControlsContext);
  const mockOnSelectDestination = jest.fn();

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onSelectDestination: mockOnSelectDestination,
    });
    mockGetNavigationItems.mockReturnValue([
      { name: bucket, onNavigate: mockOnSelectDestination, isCurrent: true },
    ]);
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
    mockGetNavigationItems.mockClear();
    mockGetNavigationParts.mockClear();
  });

  it('returns useActionDestination data', () => {
    const { result } = renderHook(() => useActionDestination());

    expect(result.current).toStrictEqual({
      label: actionDestinationLabel,
      items: [
        { name: bucket, onNavigate: expect.any(Function), isCurrent: true },
      ],
      isNavigable: undefined,
    });
  });

  it('returns empty items if current location is undefined', () => {
    mockUseControlsContext.mockReturnValue({ data: {} });

    const { result } = renderHook(() => useActionDestination());

    expect(result.current).toStrictEqual({ items: [] });
  });

  it('calls onSelectDestination', () => {
    mockGetNavigationItems.mockReturnValue([
      { name: bucket, onNavigate: mockOnSelectDestination, isCurrent: true },
    ]);
    const { result } = renderHook(() => useActionDestination());
    const [navigationItem] = result.current?.items ?? [];

    navigationItem?.onNavigate?.();

    expect(mockOnSelectDestination).toHaveBeenCalled();
  });
});

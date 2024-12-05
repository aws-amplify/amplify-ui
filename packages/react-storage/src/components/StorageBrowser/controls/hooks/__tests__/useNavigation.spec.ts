import { renderHook } from '@testing-library/react';
import { LocationPermissions } from '../../../actions';
import { NavigationProps } from '../../../composables/Navigation';
import { useControlsContext } from '../../../controls/context';
import { getNavigationItems } from '../getNavigationItems';
import { getNavigationParts } from '../getNavigationParts';
import { useNavigation } from '../useNavigation';

jest.mock('../../../controls/context');
jest.mock('../getNavigationItems');
jest.mock('../getNavigationParts');

describe('useNavigation', () => {
  const bucket = 'bucket';
  const data = {
    location: {
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
  const mockOnNavigate = jest.fn();
  const mockOnNavigateHome = jest.fn();

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onNavigateHome: mockOnNavigateHome,
      onNavigate: mockOnNavigate,
    });
    mockGetNavigationItems.mockReturnValue([
      { name: bucket, onNavigate: mockOnNavigate, isCurrent: true },
    ]);
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
    mockGetNavigationItems.mockClear();
    mockGetNavigationParts.mockClear();
    mockOnNavigate.mockClear();
    mockOnNavigateHome.mockClear();
  });

  it('returns Navigation props', () => {
    const { result } = renderHook(() => useNavigation());

    const expected: NavigationProps = {
      items: [
        { name: 'Home', onNavigate: expect.any(Function) },
        { name: bucket, onNavigate: expect.any(Function), isCurrent: true },
      ],
    };

    expect(result.current).toStrictEqual(expected);
  });

  it('returns empty items if current location is undefined', () => {
    mockUseControlsContext.mockReturnValue({ data: {} });

    const { result } = renderHook(() => useNavigation());

    expect(result.current).toStrictEqual({ items: [] });
  });

  it('calls onNavigateHome', () => {
    const { result } = renderHook(() => useNavigation());
    const [homeItem] = result.current?.items ?? [];

    homeItem?.onNavigate?.();

    expect(mockOnNavigateHome).toHaveBeenCalled();
  });

  it('calls onNavigate', () => {
    const { result } = renderHook(() => useNavigation());
    const [, navigationItem] = result.current?.items ?? [];

    navigationItem?.onNavigate?.();

    expect(mockOnNavigate).toHaveBeenCalled();
  });
});

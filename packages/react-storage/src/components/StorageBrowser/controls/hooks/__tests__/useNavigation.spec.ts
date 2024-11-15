import { renderHook } from '@testing-library/react';
import { useControlsContext } from '../../../controls/context';
import { useNavigation } from '../useNavigation';
import { LocationPermissions } from '../../../actions';

jest.mock('../../../controls/context');

describe('useNavigation', () => {
  const bucket = 'bucket';
  const prefix = 'prefix';
  const path = 'path';
  const data = {
    location: {
      current: {
        bucket,
        id: 'id',
        permissions: ['delete', 'get', 'list', 'write'] as LocationPermissions,
        prefix: `${prefix}/`,
        type: 'PREFIX',
      },
      path: `${path}/`,
      key: `${prefix}/${path}/`,
    } as const,
  };
  // assert mocks
  const mockUseControlsContext = jest.mocked(useControlsContext);
  // create mocks
  const mockOnNavigate = jest.fn();
  const mockOnNavigateHome = jest.fn();
  const mockRandomUUID = jest.fn();

  beforeAll(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: mockRandomUUID },
    });
  });

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onNavigateHome: mockOnNavigateHome,
      onNavigate: mockOnNavigate,
    });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
    mockOnNavigate.mockClear();
    mockOnNavigateHome.mockClear();
  });

  it('returns useNavigation data', () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current).toStrictEqual({
      items: [
        { name: 'Home', onNavigate: expect.any(Function) },
        { name: `${bucket}/${prefix}`, onNavigate: expect.any(Function) },
        { name: path, onNavigate: expect.any(Function), isCurrent: true },
      ],
    });
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

  describe('PREFIX type location', () => {
    it('creates an item for the prefix and each subpath', () => {
      mockUseControlsContext.mockReturnValue({
        data: { location: { ...data.location, path: 'a/b/c/' } },
      });

      const { result } = renderHook(() => useNavigation());

      // Home > bucket/prefix > a > b > c
      expect(result.current?.items).toHaveLength(5);
    });

    it('does not split the prefix into separate items', () => {
      const prefixWithSlashes = 'prefix/with/slashes';
      mockUseControlsContext.mockReturnValue({
        data: {
          location: {
            ...data.location,
            current: { ...data.location.current, prefix: prefixWithSlashes },
          },
        },
      });

      const { result } = renderHook(() => useNavigation());

      // Home > bucket/prefix/with/slashes > path
      expect(result.current?.items).toHaveLength(3);
      expect(result.current?.items[1].name).toBe(
        `${bucket}/${prefixWithSlashes}`
      );
    });

    it('creates navigation items correctly', () => {
      const foo = 'foo';
      const bar = 'bar';
      const qux = 'qux';
      mockRandomUUID
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(3);
      mockUseControlsContext.mockReturnValue({
        data: { location: { ...data.location, path: `${foo}/${bar}/${qux}/` } },
        onNavigate: mockOnNavigate,
      });

      const { result } = renderHook(() => useNavigation());

      // Home > bucket/prefix > foo > bar > qux
      const [, prefixItem, fooItem, barItem] = result.current?.items ?? [];

      prefixItem?.onNavigate?.();
      fooItem?.onNavigate?.();
      barItem?.onNavigate?.();

      expect(mockOnNavigate).toHaveBeenNthCalledWith(
        1,
        { ...data.location.current, id: 1 },
        ''
      );
      expect(mockOnNavigate).toHaveBeenNthCalledWith(
        2,
        { ...data.location.current, id: 2 },
        `${foo}/`
      );
      expect(mockOnNavigate).toHaveBeenNthCalledWith(
        3,
        { ...data.location.current, id: 3 },
        `${foo}/${bar}/`
      );
    });
  });

  describe('BUCKET type location', () => {
    it('creates an item for the bucket, prefix and each subpath', () => {
      mockUseControlsContext.mockReturnValue({
        data: {
          location: {
            ...data.location,
            current: {
              ...data.location.current,
              type: 'BUCKET',
            },
            path: 'a/b/c/',
          },
        },
      });

      const { result } = renderHook(() => useNavigation());

      // Home > bucket > prefix > a > b > c
      expect(result.current?.items).toHaveLength(6);
    });

    it('does not split the prefix into separate items', () => {
      const prefixWithSlashes = 'prefix/with/slashes';
      mockUseControlsContext.mockReturnValue({
        data: {
          location: {
            ...data.location,
            current: {
              ...data.location.current,
              prefix: prefixWithSlashes,
              type: 'BUCKET',
            },
          },
        },
      });

      const { result } = renderHook(() => useNavigation());

      // Home > bucket > prefix/with/slashes > path
      expect(result.current?.items).toHaveLength(4);
      expect(result.current?.items[1].name).toBe(bucket);
      expect(result.current?.items[2].name).toBe(prefixWithSlashes);
    });

    it('creates navigation items correctly', () => {
      const foo = 'foo';
      const bar = 'bar';
      const qux = 'qux';
      mockRandomUUID
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(3)
        .mockReturnValueOnce(4);
      mockUseControlsContext.mockReturnValue({
        data: {
          location: {
            ...data.location,
            current: {
              ...data.location.current,
              type: 'BUCKET',
            },
            path: `${foo}/${bar}/${qux}/`,
          },
        },
        onNavigate: mockOnNavigate,
      });

      const { result } = renderHook(() => useNavigation());

      // Home > bucket > prefix > foo > bar > qux
      const [, bucketItem, prefixItem, fooItem, barItem] =
        result.current?.items ?? [];

      bucketItem?.onNavigate?.();
      prefixItem?.onNavigate?.();
      fooItem?.onNavigate?.();
      barItem?.onNavigate?.();

      expect(mockOnNavigate).toHaveBeenNthCalledWith(
        1,
        { ...data.location.current, type: 'BUCKET', id: 1 },
        ''
      );
      expect(mockOnNavigate).toHaveBeenNthCalledWith(
        2,
        { ...data.location.current, type: 'BUCKET', id: 2 },
        `${prefix}/`
      );
      expect(mockOnNavigate).toHaveBeenNthCalledWith(
        3,
        { ...data.location.current, type: 'BUCKET', id: 3 },
        `${prefix}/${foo}/`
      );
      expect(mockOnNavigate).toHaveBeenNthCalledWith(
        4,
        { ...data.location.current, type: 'BUCKET', id: 4 },
        `${prefix}/${foo}/${bar}/`
      );
    });
  });
});

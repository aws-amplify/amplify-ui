import { LocationPermissions } from '../../../actions';
import { getNavigationItems } from '../getNavigationItems';

describe('getNavigationItems', () => {
  const uuid = 'uuid';
  const prefix = 'prefix';
  const partA = 'part-a';
  const partB = 'part-b';
  const destinationParts = [prefix, partA, partB];
  const location = {
    bucket: 'bucket',
    id: 'id',
    permissions: ['delete', 'get', 'list', 'write'] as LocationPermissions,
    prefix: `${prefix}/`,
    type: 'PREFIX',
  } as const;
  const mockOnNavigate = jest.fn();
  const mockRandomUUID = jest.fn();

  beforeAll(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: mockRandomUUID },
    });
    mockRandomUUID.mockReturnValue(uuid);
  });

  afterEach(() => {
    mockOnNavigate.mockClear();
  });

  it('returns navigation items', () => {
    expect(
      getNavigationItems({
        destinationParts,
        location,
        onNavigate: mockOnNavigate,
      })
    ).toStrictEqual([
      { name: prefix, onNavigate: expect.any(Function) },
      { name: partA, onNavigate: expect.any(Function) },
      { isCurrent: true, name: partB, onNavigate: expect.any(Function) },
    ]);
  });

  it('calls onNavigate', () => {
    const [item1, item2, item3] = getNavigationItems({
      destinationParts,
      location,
      onNavigate: mockOnNavigate,
    });

    item1.onNavigate?.();
    item2.onNavigate?.();
    item3.onNavigate?.();

    expect(mockOnNavigate).toHaveBeenNthCalledWith(
      1,
      { ...location, id: uuid },
      ''
    );

    expect(mockOnNavigate).toHaveBeenNthCalledWith(
      2,
      { ...location, id: uuid },
      `${partA}/`
    );

    expect(mockOnNavigate).toHaveBeenNthCalledWith(
      3,
      { ...location, id: uuid },
      `${partA}/${partB}/`
    );
  });
});

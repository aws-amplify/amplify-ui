import { getPaginatedLocations } from '../getPaginatedLocations';
import { ListLocationsHandlerOutput } from '../../../actions';

describe('getPaginatedLocations', () => {
  const mockItems: ListLocationsHandlerOutput['items'] = [
    {
      type: 'PREFIX',
      permissions: ['list'],
      prefix: 'path1/',
      bucket: 'bucket1',
      id: '1',
    },
    {
      type: 'PREFIX',
      permissions: ['get'],
      prefix: 'path2/',
      bucket: 'bucket2',
      id: '2',
    },
    {
      type: 'PREFIX',
      permissions: ['write'],
      prefix: 'path3/',
      bucket: 'bucket3',
      id: '3',
    },
  ];

  it('should return all locations when no pagination is specified', () => {
    const result = getPaginatedLocations({ items: mockItems });
    expect(result).toEqual({ items: mockItems });
  });

  it('should return paginated locations when pageSize is specified', () => {
    const result = getPaginatedLocations({
      items: mockItems,
      pageSize: 2,
    });
    expect(result).toEqual({
      items: mockItems.slice(0, 2),
      nextToken: '1',
    });
  });

  it('should return paginated locations when pageSize and nextToken are specified', () => {
    const result = getPaginatedLocations({
      items: mockItems,
      pageSize: 1,
      nextToken: '2',
    });
    expect(result).toEqual({
      items: mockItems.slice(1, 2),
      nextToken: '1',
    });
  });

  it('should return empty locations when locations array is empty', () => {
    const result = getPaginatedLocations({ items: [], pageSize: 2 });
    expect(result).toEqual({ items: [] });
  });

  it('should return empty location when nextToken is beyond array length', () => {
    const result = getPaginatedLocations({
      items: mockItems,
      pageSize: 2,
      nextToken: '5',
    });
    expect(result).toEqual({ items: [], nextToken: undefined });
  });

  it('should return all remaining location when page size is greater than remaining locations length', () => {
    const result = getPaginatedLocations({
      items: mockItems,
      pageSize: 5,
      nextToken: '2',
    });
    expect(result).toEqual({
      items: mockItems.slice(-2),
      nextToken: undefined,
    });
  });

  it('should return undefined nextToken when end of array is reached', () => {
    const result = getPaginatedLocations({
      items: mockItems,
      pageSize: 5,
    });
    expect(result).toEqual({
      items: mockItems.slice(0, 3),
      nextToken: undefined,
    });
  });
});

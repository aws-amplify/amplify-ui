import { createSpaceSeparatedIds } from '../createSpaceSeparatedIds';

describe('createSpaceSeparatedIds', () => {
  it('should join all defined strings with a space', () => {
    const ids = ['id1', 'id2', 'id3'];
    const result = createSpaceSeparatedIds(ids);
    expect(result).toBe('id1 id2 id3');
  });

  it('should ignore undefined values and join the rest with a space', () => {
    const ids = ['id1', undefined, 'id3'];
    const result = createSpaceSeparatedIds(ids);
    expect(result).toBe('id1 id3');
  });

  it('should return undefined if all values are undefined', () => {
    const ids = [undefined, undefined];
    const result = createSpaceSeparatedIds(ids);
    expect(result).toBeUndefined();
  });

  it('should return a single id if there is only one defined value', () => {
    const ids = [undefined, 'id2', undefined];
    const result = createSpaceSeparatedIds(ids);
    expect(result).toBe('id2');
  });

  it('should return undefined if the array is empty', () => {
    const ids: (string | undefined)[] = [];
    const result = createSpaceSeparatedIds(ids);
    expect(result).toBeUndefined();
  });
});

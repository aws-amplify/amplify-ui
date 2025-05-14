import { getUniqueComponentId } from '../getUniqueComponentId';

describe('getTestId', () => {
  it('should return `undefined` if either or both param is undefined', () => {
    expect(getUniqueComponentId(undefined, undefined)).toBeUndefined();
    expect(getUniqueComponentId('testId', undefined)).toBeUndefined();
    expect(getUniqueComponentId(undefined, 'component')).toBeUndefined();
  });

  it('should return combined testId if both params are provided', () => {
    expect(getUniqueComponentId('testId', 'component')).toEqual(
      'testId-component'
    );
  });
});

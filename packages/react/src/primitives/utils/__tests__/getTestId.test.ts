import { getTestId } from '../getTestId';

describe('getTestId', () => {
  it('should return `undefined` if either or both param is undefined', () => {
    expect(getTestId(undefined, undefined)).toBeUndefined();
    expect(getTestId('testId', undefined)).toBeUndefined();
    expect(getTestId(undefined, 'component')).toBeUndefined();
  });

  it('should return combined testId if both params are provided', () => {
    expect(getTestId('testId', 'component')).toEqual('testId-component');
  });
});

import { checkRequiredKeys } from '../../integrity';

interface TestObject {
  key1?: string | null;
  key2?: string | null;
  key3?: string | null;
  extraKey?: string | null;
}

describe('checkRequiredKeys', () => {
  it('should not throw when all required keys are present', () => {
    const object: TestObject = {
      key1: 'value1',
      key2: 'value2',
    };

    expect(
      checkRequiredKeys(object, 'test-object', ['key1', 'key2'])
    ).toBeUndefined();
  });

  it('should not throw when required keys array is empty', () => {
    const object: TestObject = { key1: 'value1', key2: 'value2' };

    expect(checkRequiredKeys(object, 'test-object', [])).toBeUndefined();
  });

  it('should not throw when the object has extra keys', () => {
    const object: TestObject = {
      key1: 'value1',
      key2: 'value2',
      extraKey: 'extra',
    };

    expect(
      checkRequiredKeys(object, 'test-object', ['key1', 'key2'])
    ).toBeUndefined();
  });

  it('should throw when a required key is missing', () => {
    const object: TestObject = { key1: 'value1', key3: 'value3' };

    expect(() =>
      checkRequiredKeys(object, 'test-object', ['key1', 'key2'])
    ).toThrow();
  });

  it('should throw when object is empty and required keys are specified', () => {
    const object: TestObject = {};

    expect(() =>
      checkRequiredKeys(object, 'test-object', ['key1', 'key2'])
    ).toThrow();
  });

  it('should throw on null values correctly', () => {
    const object: TestObject = { key1: null, key2: 'value2' };

    expect(() =>
      checkRequiredKeys(object, 'test-object', ['key1', 'key2'])
    ).toThrow();
  });

  it('should throw on undefined values correctly', () => {
    const object: TestObject = { key1: undefined, key2: 'value2' };

    expect(() =>
      checkRequiredKeys(object, 'test-object', ['key1', 'key2'])
    ).toThrow();
  });
});

import {
  getErrorMessage,
  isDevelopment,
  isErrorWithMessage,
  toErrorWithMessage,
} from '../utils';

describe('isDevelopment', () => {
  it.each([
    ['development', true],
    ['production', false],
  ])('should return %s when NODE_ENV is %s', (env, expectedResult) => {
    process.env.NODE_ENV = env;
    const result = isDevelopment();
    expect(result).toBe(expectedResult);
  });
});

describe('isErrorWithMessage', () => {
  it('should return true for an ErrorWithMessage object', () => {
    const error = new Error('This is an error message');
    expect(isErrorWithMessage(error)).toBe(true);
  });

  it('should return false for a non-object', () => {
    const error = 'This is a string';
    expect(isErrorWithMessage(error)).toBe(false);
  });

  it('should return false for null', () => {
    const error = null;
    expect(isErrorWithMessage(error)).toBe(false);
  });

  it('should return false for an object without a message property', () => {
    const error = { code: 404 };
    expect(isErrorWithMessage(error)).toBe(false);
  });

  it('should return false for an object with a non-string message property', () => {
    const error = { message: 123 };
    expect(isErrorWithMessage(error)).toBe(false);
  });
});

describe('toErrorWithMessage', () => {
  it('should return an ErrorWithMessage when given an error', () => {
    const errorWithMessage = new Error('This is an error message');
    const result = toErrorWithMessage(errorWithMessage);
    expect(isErrorWithMessage(result)).toBe(true);
    expect(result.message).toBe('This is an error message');
  });

  it('should convert other objects to Errors with JSON stringified messages', () => {
    const obj = { key: 'value' };
    const result = toErrorWithMessage(obj);
    expect(isErrorWithMessage(result)).toBe(true);
    expect(result.message).toBe(JSON.stringify(obj));
  });

  it('should convert circular references to Errors with stringified messages', () => {
    const circularObj = {} as any;
    circularObj.circular = circularObj;
    const result = toErrorWithMessage(circularObj);
    expect(isErrorWithMessage(result)).toBe(true);
    expect(result.message).toBe(String(circularObj));
  });

  it('should convert primitive values to Errors with stringified messages', () => {
    const num = 42;
    const result = toErrorWithMessage(num);
    expect(isErrorWithMessage(result)).toBe(true);
    expect(result.message).toBe(String(num));
  });

  it('should convert null to an Error with stringified message "null"', () => {
    const result = toErrorWithMessage(null);
    expect(isErrorWithMessage(result)).toBe(true);
    expect(result.message).toBe('null');
  });
});

describe('getErrorMessage', () => {
  it('should return a string when given an error', () => {
    const errorWithMessage = new Error('This is an error message');
    const result = getErrorMessage(errorWithMessage);
    expect(result).toBe('This is an error message');
  });
});
